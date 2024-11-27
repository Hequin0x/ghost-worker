import { error } from 'itty-router';

export async function purgeCacheByURL(URLs: string[], env: Env): Promise<Response> {
  const zoneID = env.CLOUDFLARE_ZONE_ID;
  const body = `{"files": ${JSON.stringify(URLs)}}`;

  console.log(`Purging URLs: ${URLs} from cache for zone: ${zoneID}.`);

  return execute(body, env);
}

export async function purgeAllCache(env: Env): Promise<Response> {
  const zoneID = env.CLOUDFLARE_ZONE_ID;
  const body = `{"purge_everything": ${true}}`;

  console.log(`Purging all cache for zone: ${zoneID}.`);

  return execute(body, env);
}

async function execute(body: string, env: Env): Promise<Response> {
  const apiToken = env.CLOUDFLARE_API_TOKEN;
  const zoneID = env.CLOUDFLARE_ZONE_ID;

  if (!apiToken) {
    return error(400, 'Cloudflare API token is required.');
  }

  if (!zoneID) {
    return error(400, 'Cloudflare zone ID is required.');
  }

  const url = `https://api.cloudflare.com/client/v4/zones/${zoneID}/purge_cache`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiToken}`
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });

  const result = await response.json();
  const jsonStr = JSON.stringify(result);

  console.log(`Purge cache for zone '${zoneID}' ${response.ok ? 'succeeded' : 'failed'}.`);

  return new Response(jsonStr, { status: response.status });
}
