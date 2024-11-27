import { AutoRouter } from 'itty-router';
import PostUpdated from './handlers/cache/post/post-updated';
import PostPublished from './handlers/cache/post/post-published';
import SiteChanged from './handlers/cache/site/site-changed';
import withAuthenticatedWebHook from './handlers/security/webhook-authenticator';

const router = AutoRouter({ base: '/api' });

// Validate the ghost webhook authenticity
router.all('*', withAuthenticatedWebHook)
  // Post cache purge
  .post('/cache/post/updated', PostUpdated)
  .post('/cache/post/published', PostPublished)
  // Site cache purge
  .post('/cache/site/changed', SiteChanged);

export default router;
