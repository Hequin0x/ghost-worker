import { IRequest } from 'itty-router';
import { purgeAllCache } from '../../../services/zone/purge-cache';

export default async function SiteChanged(request: IRequest, env: Env): Promise<Response>{
  return purgeAllCache(env);
}
