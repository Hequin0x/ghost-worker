import { Router } from 'itty-router';
import PostUpdated from './handlers/cache/post/post-updated';
import PostPublished from './handlers/cache/post/post-published';
import SiteChanged from './handlers/cache/site/site-changed';

const router = Router();

// Post cache purge
router.post('/api/cache/post/updated', PostUpdated);
router.post('/api/cache/post/published', PostPublished);
//router.post('/api/cache/post/deleted', PostDeleted);

// Site cache purge
router.post('/api/cache/site/changed', SiteChanged);

// Not found
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
