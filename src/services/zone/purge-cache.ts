import { error } from 'itty-router';

export async function purgeCacheByURL(URLs: string[], env: Env): Promise<Response> {
  const { CLOUDFLARE_ZONE_ID: zoneID } = env;
  const body = JSON.stringify({ files: URLs });

  console.log(`Purging URLs: ${URLs} from cache for zone: ${zoneID}.`);

  return execute(body, env);
}

export async function purgeAllCache(env: Env): Promise<Response> {
  console.log(`Purging all cache for zone: ${env.CLOUDFLARE_ZONE_ID}.`);
  return execute(`{"purge_everything": true}`, env);
}

async function execute(body: string, env: Env): Promise<Response> {
  const { CLOUDFLARE_API_TOKEN: apiToken, CLOUDFLARE_ZONE_ID: zoneID } = env;

  if (!apiToken || !zoneID) {
    return error(400, `Cloudflare ${!apiToken ? 'API token' : 'zone ID'} is required.`);
  }

  const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneID}/purge_cache`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiToken}`
    },
    body: JSON.stringify(body)
  });

  const result = await response.json();
  console.log(`Purge cache for zone '${zoneID}' ${response.ok ? 'succeeded' : 'failed'}.`);

  return new Response(JSON.stringify(result), { status: response.status });
}
