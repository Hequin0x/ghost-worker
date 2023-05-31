export async function purgeCacheByURL(URLs: string[], zoneID: string) {
  const body = {
    'files': URLs
  };

  console.log(`Purging URLs: ${body.files} from cache for zone: ${zoneID}.`);

  return execute(body.files, zoneID);
}

export async function purgeAllCache(zoneID: string) {
  const body = {
    'purge_everything': true
  };

  console.log(`Purging all cache for zone: ${zoneID}.`);

  return execute(body, zoneID);
}

async function execute(body: {}, zoneID: string) {
  if (!zoneID) {
    return new Response('Zone ID is required.', { status: 400 })
  }

  const url = `https://api.cloudflare.com/client/v4/zones/${zoneID}/purge_cache`;
  const headers = {
    'X-Auth-Email': ' '  // Cloudflare email
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
