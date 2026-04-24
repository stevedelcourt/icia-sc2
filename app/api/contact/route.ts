import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const hubspotEndpoint = 'https://api.hsforms.com/submissions/v3/integration/submit/49558612/9181c8cf-5f81-4459-af6b-81c8c3e69f91'

    const response = await fetch(hubspotEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Erreur ${response.status}: ${errorText}` },
        { status: response.status }
      )
    }
  } catch (err) {
    console.error('HubSpot proxy error:', err)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}