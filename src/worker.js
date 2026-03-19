addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
export default {
  async function handleRequest(request) {
    const url = new URL(request.url)
    let targetURL = new URL('https://generativelanguage.googleapis.com')
  
    targetURL.pathname = url.pathname
    targetURL.search = url.search
  
    let newRequest = new Request(targetURL, {
      method: request.method,
      headers: request.headers,
      body: request.body
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
