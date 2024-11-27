import { IRequest } from 'itty-router';

/**
 * Purge cache for post deleted.
 * @param request
 * @param env
 * @constructor
 */
export default async function PostDeleted(request: IRequest, env: Env): Promise<Response>{
  const test: string = await request.json();
  console.log(JSON.parse(JSON.stringify(test)));
  /*const deletedPost: PostDeleteModel = await request.json();

  if (!deletedPost) {
    return new Response('Post is required.', { status: 400 });
  }

  const websiteURL: string = HostUtils.getHostFromRequest(request, true);
  const postURL: string = `${websiteURL}/${deletedPost.post.previous.slug}`;

  if (!postURL) {
    return new Response('Post URL is required.', { status: 400 });
  }

  const sitemapURL: string = `${websiteURL}/sitemap.xml`;

  const urlsToPurge: string[] = [
    postURL,
    websiteURL,
    sitemapURL
  ];

  return purgeCacheByURL(urlsToPurge, env);*/
  return new Response('Post deleted.', { status: 200 });
}
