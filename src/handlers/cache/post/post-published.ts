import { IRequest } from 'itty-router';
import { purgeCacheByURL } from '../../../services/zone/purge-cache';
import { PostUpdatedModel } from '../../../models/ghost/post/post-updated-model';
import HostUtils from '../../../utils/HostUtils';

/**
 * Purge cache for post published.
 * @param request
 * @param env
 * @constructor
 */
async function PostPublished(request: IRequest, env: Env){
  const publishedPost: PostUpdatedModel = await request.json();

  if (!publishedPost) {
    return new Response('Post is required.', { status: 400 });
  }

  const postURL: string = publishedPost.post.current.url;

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

export default PostPublished;
