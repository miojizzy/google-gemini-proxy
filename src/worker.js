export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    let targetURL = new URL(env.TARGET_BASE_URL)

    targetURL.pathname = url.pathname
    targetURL.search = url.search

    const hasBody = !['GET', 'HEAD'].includes(request.method)
    let newRequest = new Request(targetURL, {
      method: request.method,
      headers: request.headers,
      body: hasBody ? request.body : undefined,
    })
  
    let response = await fetch(newRequest)
  
    let corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers'),
    }
  
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }
  
    let responseHeaders = new Headers(response.headers)
    for (let [key, value] of Object.entries(corsHeaders)) {
      responseHeaders.set(key, value)
    }
  
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    })
  }
}
