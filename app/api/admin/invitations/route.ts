import { randomBytes } from 'node:crypto'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { supabaseServer } from '@/lib/supabase'

export const runtime = 'nodejs'

const MAX_ALLOWED_GUESTS = 20

function validGuest(value: unknown): value is { name: string; phone: string; allowedGuests: number } {
  if (!value || typeof value !== 'object') return false
  const guest = value as Record<string, unknown>
  return (
    typeof guest.name === 'string' &&
    guest.name.trim().length > 0 &&
    guest.name.length <= 120 &&
    typeof guest.phone === 'string' &&
    guest.phone.length <= 40 &&
    typeof guest.allowedGuests === 'number' &&
    Number.isInteger(guest.allowedGuests) &&
    guest.allowedGuests >= 1 &&
    guest.allowedGuests <= MAX_ALLOWED_GUESTS
  )
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Please check the guest details.' }, { status: 400 })
  }

  if (!validGuest(body)) {
    return Response.json({ error: 'Please provide a name and 1–20 allowed guests.' }, { status: 400 })
  }

  const database = supabaseServer()
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const inviteToken = randomBytes(16).toString('hex')
    const { data, error } = await database
      .from('invitations')
      .insert({
        name: body.name.trim(),
        phone: body.phone.trim() || null,
        allowed_guests: body.allowedGuests,
        invite_token: inviteToken,
      })
      .select('id, name, phone, allowed_guests, invite_token, rsvp_status, rsvp_attendee_count, created_at')
      .single()

    if (!error) return Response.json({ invitation: data }, { status: 201 })
    if (error.code !== '23505') {
      console.error('Could not create invitation', error)
      return Response.json({ error: 'Could not create this invitation. Please try again.' }, { status: 502 })
    }
  }

  return Response.json({ error: 'Could not create a unique invitation link. Please try again.' }, { status: 500 })
}
