import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const url = `${process.env.AGILIATE_URL ?? 'http://localhost:1337'}/calculate?version=1`
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    })
    const contentType = upstream.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const data = await upstream.json()
      return NextResponse.json(data, { status: upstream.status })
    }
    const text = await upstream.text()
    return NextResponse.json({ error: 'Upstream returned non-JSON', body: text }, { status: upstream.status })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Failed to reach calculation engine', message }, { status: 502 })
  }
}

