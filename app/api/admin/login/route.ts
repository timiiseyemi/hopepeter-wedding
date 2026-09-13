import { NextResponse } from 'next/server'
import {
  adminCookieName,
  adminSessionDuration,
  createAdminSession,
  validAdminPassword,
} from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Please enter the admin password.' }, { status: 400 })
  }

  const password = body && typeof body === 'object' && typeof (body as { password?: unknown }).password === 'string'
    ? (body as { password: string }).password
    : ''

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Admin access is not configured.' }, { status: 503 })
  }

  if (!validAdminPassword(password)) {
    return Response.json({ error: 'Incorrect admin password.' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(adminCookieName, createAdminSession(), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: adminSessionDuration,
  })
  return response
}
