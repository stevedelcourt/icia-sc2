import { NextRequest, NextResponse } from 'next/server'

const clientId = process.env.OAUTH_GITHUB_CLIENT_ID
const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectUri = `${new URL(request.url).origin}/api/auth/callback`

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  })

  const data = await response.json()

  if (data.access_token) {
    const html = `<!DOCTYPE html><html><head><script>
      localStorage.setItem('token', '${data.access_token}');
      window.location.href = '/admin/';
    </script></head><body>Authenticated! Redirecting...</body></html>`
    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
  }

  return NextResponse.json({ error: 'Authentication failed' }, { status: 400 })
}

export const dynamic = 'force-static'
