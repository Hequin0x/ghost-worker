import { error } from 'itty-router';

export async function purgeCacheByURL(URLs: string[], env: Env, zoneID: string): Promise<Response> {
  const body: string = JSON.stringify({ files: URLs });
  console.log(`Purging URLs: ${URLs} from cache for zone: ${zoneID}.`);
  return execute(body, env, zoneID);
}

export async function purgeAllCache(env: Env, zoneID: string): Promise<Response> {
  console.log(`Purging all cache for zone: ${zoneID}.`);
  return execute(`{"purge_everything": true}`, env, zoneID);
}

async function execute(body: string, env: Env, zoneID: string): Promise<Response> {
  const { CLOUDFLARE_API_TOKEN: apiToken } = env;

  if (!apiToken) {
    return error(400, `Cloudflare API token is required.`);
  }

  const response: Response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneID}/purge_cache`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiToken}`
    },
    body: JSON.stringify(body)
  });

  try {
    const result: unknown = await response.json();
    console.log(`Purge cache for zone '${zoneID}' ${response.ok ? 'succeeded' : 'failed'}.`);
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (exception) {
    return error(500, `Failed to parse response from Cloudflare API: ${exception}`);
  }
}
