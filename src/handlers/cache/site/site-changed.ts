import { IRequest } from 'itty-router';
import { purgeAllCache } from '../../../services/zone/purge-cache';

async function SiteChanged(request: IRequest, env: Env): Promise<Response>{
  return purgeAllCache(env);
}

export default SiteChanged;
