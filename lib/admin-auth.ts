import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'wedding_admin_session'
const SESSION_DURATION = 60 * 60 * 24 * 7

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || ''
}

function signature(expiresAt: string) {
  return createHmac('sha256', sessionSecret()).update(expiresAt).digest('hex')
}

export function validAdminPassword(value: string) {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false

  const supplied = Buffer.from(value)
  const expected = Buffer.from(password)
  return supplied.length === expected.length && timingSafeEqual(supplied, expected)
}

export function createAdminSession() {
  const expiresAt = String(Date.now() + SESSION_DURATION * 1000)
  return `${expiresAt}.${signature(expiresAt)}`
}

export async function isAdminAuthenticated() {
  if (!sessionSecret()) return false

  const value = (await cookies()).get(COOKIE_NAME)?.value
  if (!value) return false

  const [expiresAt, suppliedSignature] = value.split('.')
  if (!expiresAt || !suppliedSignature || Number(expiresAt) < Date.now()) return false

  const expectedSignature = signature(expiresAt)
  const supplied = Buffer.from(suppliedSignature)
  const expected = Buffer.from(expectedSignature)
  return supplied.length === expected.length && timingSafeEqual(supplied, expected)
}

export const adminCookieName = COOKIE_NAME
export const adminSessionDuration = SESSION_DURATION
