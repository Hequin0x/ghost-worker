import { error, IRequest } from 'itty-router';
import * as crypto from "crypto";

export default async function withAuthenticatedWebHook(request: IRequest, env: Env): Promise<Response | void> {
  const signature = request.headers.get('x-ghost-signature');
  if (!signature) return error(401, 'Missing or invalid x-ghost-signature header.');

  const [ghostHmac, timestamp] = signature.split(',').map(part => part.split('=')[1]);
  if (!ghostHmac || !timestamp) return error(401, 'Missing parts in x-ghost-signature header.');

  const hmac = crypto.createHmac('sha256', env.GHOST_SECRET)
    .update(JSON.stringify(request.body) + timestamp)
    .digest('hex');

  if (ghostHmac !== hmac) return error(401, 'Invalid ghost signature.');
}