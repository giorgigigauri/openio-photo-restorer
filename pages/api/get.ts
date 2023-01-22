import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import redis from "../../utils/redis";
import {autoId} from "@google-cloud/firestore/build/src/util";
import {getRestored } from '../../utils/firebase-admin'

type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    id: string;
  };
}

// Create a new ratelimiter, that allows 3 requests per 60 seconds
const ratelimit = redis
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
        .json(
          "Too many uploads in 1 minute. Please try again in a few minutes."
        );
      return;
    }
  }

  const id = req.body.id;
 
  if(id) {
    console.log(await getRestored(id));
  }
  
  res
    .status(200)
    .json(id ? id : "Failed to get image");
}
