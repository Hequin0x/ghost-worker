import { IRequest } from 'itty-router';
import { purgeCacheByURL } from '../../../services/zone/purge-cache';

async function PostCreated(request: IRequest, env: Env){
  const zoneID: string = env.CLOUDFLARE_ZONE_ID;
  return purgeCacheByURL(['https://www.example.com/'], zoneID);
}

export default PostCreated;
