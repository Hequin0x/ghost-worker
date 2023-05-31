import { IRequest } from 'itty-router';
import { purgeAllCache } from '../../../services/zone/purge-cache';

async function SettingsUpdated(request: IRequest, env: Env){
  return purgeAllCache(env);
}

export default SettingsUpdated;
