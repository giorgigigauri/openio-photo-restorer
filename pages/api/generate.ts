import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import redis from "../../utils/redis";
import {autoId} from "@google-cloud/firestore/build/src/util";
import {saveRestored} from '../../services/restorer'
import crypto from "crypto"

type Data = {
  uuid?: string,
  restoredImage?: string,
  message?: string 
};
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

// Create a new ratelimiter, that allows 3 requests per 60 seconds
const ratelimit = redis && false
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(3, "60 s"),
    })
  : undefined;

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  // Rate Limiter Code
  if (ratelimit) {
    const identifier = requestIp.getClientIp(req);
    const result = await ratelimit.limit(identifier!);
    res.setHeader("X-RateLimit-Limit", result.limit);
    res.setHeader("X-RateLimit-Remaining", result.remaining);

    if (!result.success) {
      res
        .status(429)
        .json({
          message: "Too many uploads in 1 minute. Please try again in a few minutes."
        });
      return;
    }
  }

  const imageUrl = req.body.imageUrl;
  // POST request to Replicate to start the image restoration generation process
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
    body: JSON.stringify({
      version:
        "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
      input: { img: imageUrl, version: "v1.4", scale: 2 },
    }),
  });

  let jsonStartResponse = await startResponse.json();
  let endpointUrl = jsonStartResponse.urls.get;

  // GET request to get the status of the image restoration process & return the result when it's ready
  let restoredImage: string | null = null;
  while (!restoredImage) {
    // Loop in 1s intervals until the alt text is ready
    console.log("polling for result...");
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    });
    let jsonFinalResponse = await finalResponse.json();

    if (jsonFinalResponse.status === "succeeded") {
      restoredImage = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  if(restoredImage) {
    let uuid = crypto.randomUUID()
    saveRestored(
      {
        uuid: uuid,
        image: imageUrl,
        restored: restoredImage
      }
    );
    res
      .status(200)
      .json({
        uuid: uuid,
        restoredImage: restoredImage
      });
  } else {
    res
      .status(503)
      .json({
        message: "Failed to restore image"
      });
  }
}
