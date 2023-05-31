import { Router } from 'itty-router';
import PostUpdated from './handlers/cache/post/post-updated';
import PostCreated from './handlers/cache/post/post-created';
import SettingsUpdated from './handlers/cache/site/settings-updated';

const router = Router();

// Post cache purge
router.post('/api/cache/post/updated', PostUpdated);
router.post('/api/cache/post/created', PostCreated);

// Site cache purge
router.post('/api/cache/site/settings/updated', SettingsUpdated);

// Not found
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
