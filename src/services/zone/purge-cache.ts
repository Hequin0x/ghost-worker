export async function purgeCacheByURL(URLs: string[], env: Env) {
  const zoneID = env.CLOUDFLARE_ZONE_ID;
  const body = `{"files": ${JSON.stringify(URLs)}}`;

  console.log(`Purging URLs: ${URLs} from cache for zone: ${zoneID}.`);

  return execute(body, env);
}

export async function purgeAllCache(env: Env) {
  const zoneID = env.CLOUDFLARE_ZONE_ID;
  const body = `{"purge_everything": ${true}}`;

  console.log(`Purging all cache for zone: ${zoneID}.`);

  return execute(body, env);
}

async function execute(body: string, env: Env) {
  const apiToken = env.CLOUDFLARE_API_TOKEN;
  const zoneID = env.CLOUDFLARE_ZONE_ID;

  if (!apiToken) {
    return new Response('API Token is required.', { status: 400 })
  }

  if (!zoneID) {
    return new Response('Zone ID is required.', { status: 400 })
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

  console.log(`Purge cache for zone: ${zoneID} ${response.ok ? 'succeeded' : 'failed'}, response: ${jsonStr}.`);

  return new Response(jsonStr, { status: response.status });
}
