import { IRequest } from 'itty-router';
import { purgeCacheByURL } from '../../../services/zone/purge-cache';

async function PostCreated(request: IRequest){
  return purgeCacheByURL(['https://www.example.com/']);
}

export default PostCreated;
