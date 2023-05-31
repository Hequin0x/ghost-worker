import { IRequest } from 'itty-router';
import { purgeCacheByURL } from '../../../services/zone/purge-cache';
import { PostUpdatedModel } from '../../../models/ghost/post/post-updated-model';
import HostUtils from '../../../utils/HostUtils';

/**
 * Purge cache for post created.
 * @param request
 * @param env
 * @constructor
 */
async function PostCreated(request: IRequest, env: Env){
  const createdPost: PostUpdatedModel = await request.json();

  if (!createdPost) {
    return new Response('Post is required.', { status: 400 });
  }

  const postURL: string = createdPost.post.current.url;

  if (!postURL) {
    return new Response('Post URL is required.', { status: 400 });
  }

  const websiteURL: string = HostUtils.getHostFromURL(postURL, true);
  const sitemapURL: string = `${websiteURL}/sitemap.xml`;

  const urlsToPurge: string[] = [
    websiteURL,
    sitemapURL
  ];

  return purgeCacheByURL(urlsToPurge, env);
}

export default PostCreated;
