import { IRequest } from 'itty-router';
import { purgeCacheByURL } from '../../../services/zone/purge-cache';
import { PostCreateUpdateModel } from '../../../models/ghost/post/post-create-update-model';
import HostUtils from '../../../utils/HostUtils';

/**
 * Purge cache for post updated.
 * @param request
 * @param env
 * @constructor
 */
async function PostUpdated(request: IRequest, env: Env){
  const updatedPost: PostCreateUpdateModel = await request.json();

  if (!updatedPost) {
    return new Response('Post is required.', { status: 400 });
  }

  const postURL: string = updatedPost.post.current.url;

  if (!postURL) {
    return new Response('Post URL is required.', { status: 400 });
  }

  const websiteURL: string = HostUtils.getHostFromURL(postURL, true);
  const sitemapURL: string = `${websiteURL}/sitemap.xml`;

  const urlsToPurge: string[] = [
    postURL,
    websiteURL,
    sitemapURL
  ];

  return purgeCacheByURL(urlsToPurge, env);
}

export default PostUpdated;
