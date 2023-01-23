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
const ratelimit = undefined;

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = req.body.id;
 
  if(id) {
    console.log(await getRestored(id));
  }
  
  res
    .status(200)
    .json(id ? id : "Failed to get image");
}
