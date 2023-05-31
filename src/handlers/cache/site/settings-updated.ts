import { IRequest } from 'itty-router';
import { purgeAllCache } from '../../../services/zone/purge-cache';

async function SettingsUpdated(request: IRequest, env: Env, ctx: ExecutionContext){
  const zoneID: string = env.CLOUDFLARE_ZONE_ID;
  return purgeAllCache(zoneID);
}

export default SettingsUpdated;
