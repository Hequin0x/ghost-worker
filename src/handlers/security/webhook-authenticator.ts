import { error, IRequest } from 'itty-router';
import * as crypto from "crypto";

export default async function withAuthenticatedWebHook(request: IRequest, env: Env): Promise<Response | void> {
  const signature: string | null  = request.headers.get('x-ghost-signature');
  if (!signature) return error(401, 'Missing required header.');

  const [ghostHmac, timestamp]: string[] = signature.split(',').map(part => part.split('=')[1]);
  if (!ghostHmac || !timestamp) return error(401, 'Invalid header.');

  const hmac: string = crypto.createHmac('sha256', env.GHOST_SECRET)
    .update(JSON.stringify(request.body) + timestamp)
    .digest('hex');

  if (ghostHmac !== hmac) return error(401, 'Invalid signature.');
}
