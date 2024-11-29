import { error, IRequest } from 'itty-router';
import { purgeCacheByURL } from '../../../services/zone/purge-cache';
import { PostPublishUpdateModel } from '../../../models/ghost/post/post-publish-update-model';
import HostUtils from '../../../utils/HostUtils';

/**
 * Handles the post-published/updated event by purging the cache for the relevant URLs.
 *
 * @param {IRequest} request - The request object containing the zone ID and post data.
 * @param {Env} env - The environment object containing configuration and secrets.
 * @returns {Promise<Response>} - The response indicating the result of the cache purge operation.
 */
export default async function PostPublishedUpdated(request: IRequest, env: Env): Promise<Response> {
  const zoneID: string = request.params.zoneID;
  if (!zoneID) return error(400, 'Zone ID is required.');

  try {
    const publishedUpdatedPost: PostPublishUpdateModel = await request.json();
    if (!publishedUpdatedPost) return error(400, 'Post is required.');

    const postURL: string = publishedUpdatedPost.post.current.url;
    if (!postURL) return error(400, 'Post URL is required.');

    const websiteURL: string = HostUtils.getHostFromURL(postURL, true);
    const urlsToPurge: string[] = [websiteURL, `${websiteURL}/sitemap.xml`];

    return purgeCacheByURL(urlsToPurge, env, zoneID);
  } catch {
    return error(400, 'Invalid request body.');
  }
}
