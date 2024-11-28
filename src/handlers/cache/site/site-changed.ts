import { error, IRequest } from 'itty-router';
import { purgeAllCache } from '../../../services/zone/purge-cache';

/**
 * Handles the site-changed event by purging all cache for the specified zone.
 *
 * @param {IRequest} request - The request object containing the zone ID.
 * @param {Env} env - The environment object containing configuration and secrets.
 * @returns {Promise<Response>} - The response indicating the result of the cache purge operation.
 */
export default async function SiteChanged(request: IRequest, env: Env): Promise<Response> {
  const zoneID: string = request.params.zoneID;

  if (!zoneID) {
    return error(400, 'Zone ID is required.');
  }

  return purgeAllCache(env, zoneID);
}
