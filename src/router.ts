import { AutoRouter } from 'itty-router';
import PostPublishedUpdated from './handlers/cache/post/post-published-updated';
import SiteChanged from './handlers/cache/site/site-changed';
import withAuthenticatedWebHook from './handlers/security/webhook-authenticator';

const router = AutoRouter({ base: '/api' });

router.all('*', withAuthenticatedWebHook)
  .post('/:zoneID/cache/post/updated', PostPublishedUpdated)
  .post('/:zoneID/cache/post/published', PostPublishedUpdated)
  .post('/:zoneID/cache/site/changed', SiteChanged);

export default router;
