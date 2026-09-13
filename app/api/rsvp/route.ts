import { readFile } from 'node:fs/promises'
import { basename, resolve, sep } from 'node:path'
import { Resend } from 'resend'
import { supabaseServer } from '@/lib/supabase'
import { wedding } from '@/lib/wedding-data'

export const runtime = 'nodejs'

const MAX_LENGTHS = {
  name: 120,
  phone: 40,
  email: 254,
  guests: 2,
  message: 2_000,
} as const

type RsvpPayload = {
  name: string
  phone: string
  email: string
  attending: 'yes' | 'no'
  guests: string
  message: string
}

type RsvpRequest = RsvpPayload & { token: string }

const emailInvitationVenue = '12, LIMPSON ROAD, BY RIVER VALLEY ESTATE, GATE B OJODU BERGER'

function parseEmailList(value: string | undefined) {
  if (!value) return []

  return [...new Set(value.split(',').map((email) => email.trim().toLowerCase()).filter(Boolean))]
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function localInvitationAttachment(filePath: string | undefined, filename: string | undefined) {
  if (!filePath) return undefined

  const publicDirectory = resolve(process.cwd(), 'public')
  const resolvedPath = resolve(process.cwd(), filePath)
  if (!resolvedPath.startsWith(`${publicDirectory}${sep}`)) return undefined

  try {
    return [{
      content: await readFile(resolvedPath),
      filename: filename?.trim() || basename(resolvedPath),
    }]
  } catch {
    return undefined
  }
}

function remoteInvitationAttachment(url: string | undefined, filename: string | undefined) {
  if (!url) return undefined

  try {
    const parsedUrl = new URL(url)
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') return undefined

    return [{
      path: parsedUrl.toString(),
      filename: filename?.trim() || 'wedding-invitation-card',
    }]
  } catch {
    return undefined
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function validPayload(value: unknown): value is RsvpRequest {
  if (!value || typeof value !== 'object') return false

  const payload = value as Record<string, unknown>
  const strings = ['token', 'name', 'phone', 'email', 'attending', 'guests', 'message']
  if (strings.some((key) => typeof payload[key] !== 'string')) return false

  const rsvp = payload as RsvpRequest
  return (
    rsvp.name.trim().length > 0 &&
    rsvp.name.length <= MAX_LENGTHS.name &&
    rsvp.phone.length <= MAX_LENGTHS.phone &&
    rsvp.email.length > 0 &&
    rsvp.email.length <= MAX_LENGTHS.email &&
    validEmail(rsvp.email) &&
    (rsvp.attending === 'yes' || rsvp.attending === 'no') &&
    rsvp.message.length <= MAX_LENGTHS.message &&
    /^[a-f0-9]{32}$/.test(rsvp.token) &&
    /^(?:[1-9]|1\d|20)$/.test(rsvp.guests)
  )
}

function invitationEmail(name: string, hasAttachment: boolean) {
  const firstName = escapeHtml(name.trim().split(/\s+/)[0] || 'Friend')
  const cardMessage = hasAttachment
    ? 'Your invitation card is attached to this email. Please keep it close as we count down to a beautiful day of love, joy, and celebration.'
    : 'Your invitation details are included below. Please keep this message close as we count down to a beautiful day of love, joy, and celebration.'
  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;padding:32px 16px;background:#edf1e8;color:#244735;font-family:Georgia,'Times New Roman',serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr><td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#fbf5e7;border:1px solid #d0b371;box-shadow:0 12px 32px rgba(31,69,48,.16);">
              <tr><td style="padding:18px;border:1px solid #d0b371;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #d8c38f;">
                  <tr><td align="center" style="padding:52px 34px 48px;">
                    <p style="margin:0;color:#8a6035;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;">A special invitation</p>
                    <p style="margin:28px 0 0;color:#6c7d69;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Together with their families</p>
                    <h1 style="margin:16px 0 0;color:#254a36;font-size:42px;font-weight:normal;line-height:1.05;">${escapeHtml(wedding.bride)}</h1>
                    <p style="margin:12px 0;color:#c29a56;font-size:34px;font-style:italic;">&amp;</p>
                    <h1 style="margin:0;color:#254a36;font-size:42px;font-weight:normal;line-height:1.05;">${escapeHtml(wedding.groom)}</h1>
                    <div style="height:1px;width:48px;margin:30px auto;background:#c29a56;"></div>
                    <p style="margin:0;color:#254a36;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(wedding.dateLabel)}</p>
                    <p style="margin:12px 0 0;color:#8a6035;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;">${escapeHtml(emailInvitationVenue)}</p>
                    <p style="margin:34px 0 0;color:#6c7d69;font-size:17px;font-style:italic;line-height:1.6;">Dear ${firstName},</p>
                    <p style="margin:14px 0 0;color:#466451;font-size:16px;line-height:1.65;">Thank you for sharing your response with us. We are so grateful to have you in our lives and would be honoured to celebrate this special day with you.</p>
                    <p style="margin:14px 0 0;color:#466451;font-size:16px;line-height:1.65;">${cardMessage}</p>
                    <p style="margin:26px 0 0;color:#8a6035;font-size:17px;font-style:italic;">With love,<br>${escapeHtml(wedding.bride)} &amp; ${escapeHtml(wedding.groom)}</p>
                  </td></tr>
                </table>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
    </html>`
}

function rsvpNotification(payload: RsvpPayload) {
  const status = payload.attending === 'yes' ? 'Joyfully accepts' : 'Regretfully declines'
  const message = payload.message.trim() || 'No message provided.'

  return `
    <h1>New RSVP</h1>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone || 'Not provided')}</p>
    <p><strong>Response:</strong> ${status}</p>
    <p><strong>Guests:</strong> ${escapeHtml(payload.guests)}</p>
    <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  // RSVP_NOTIFICATION_EMAILS accepts multiple addresses separated by commas.
  // RSVP_TO_EMAIL is retained as a fallback for existing deployments.
  const notificationRecipients = parseEmailList(
    process.env.RSVP_NOTIFICATION_EMAILS || process.env.RSVP_TO_EMAIL,
  )
  if (!apiKey || !from || notificationRecipients.length === 0 || !notificationRecipients.every(validEmail)) {
    console.error('Missing RSVP email configuration')
    return Response.json({ error: 'Email is not configured yet.' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Please try again.' }, { status: 400 })
  }

  if (!validPayload(body)) {
    return Response.json({ error: 'Please check your details and try again.' }, { status: 400 })
  }

  const requestPayload: RsvpRequest = {
    ...body,
    phone: body.phone.trim(),
    message: body.message.trim(),
  }

  const database = supabaseServer()
  const { data: invitation, error: invitationError } = await database
    .from('invitations')
    .select('id, name, email, phone, allowed_guests')
    .eq('invite_token', requestPayload.token)
    .maybeSingle()

  if (invitationError) {
    console.error('Could not look up invitation', invitationError)
    return Response.json({ error: 'We could not verify your invitation. Please try again shortly.' }, { status: 502 })
  }

  if (!invitation) {
    return Response.json({ error: 'This invitation link is invalid.' }, { status: 404 })
  }

  const requestedGuests = Number(requestPayload.guests)
  if (requestPayload.attending === 'yes' && requestedGuests > invitation.allowed_guests) {
    return Response.json({ error: `This invitation is reserved for up to ${invitation.allowed_guests} guest${invitation.allowed_guests === 1 ? '' : 's'}.` }, { status: 400 })
  }

  const payload: RsvpPayload = {
    name: invitation.name,
    email: requestPayload.email.trim().toLowerCase(),
    phone: requestPayload.phone || invitation.phone || '',
    attending: requestPayload.attending,
    guests: String(requestPayload.attending === 'yes' ? requestedGuests : 0),
    message: requestPayload.message,
  }

  const { error: updateError } = await database
    .from('invitations')
    .update({
      rsvp_status: payload.attending === 'yes' ? 'attending' : 'declined',
      email: payload.email,
      rsvp_attendee_count: Number(payload.guests),
      rsvp_phone: payload.phone || null,
      rsvp_message: payload.message || null,
      responded_at: new Date().toISOString(),
    })
    .eq('id', invitation.id)

  if (updateError) {
    console.error('Could not save RSVP', updateError)
    return Response.json({ error: 'We could not save your RSVP. Please try again shortly.' }, { status: 502 })
  }

  // First try the card stored inside this project. A hosted URL remains available
  // as a fallback if you prefer to keep the card outside the deployment.
  const cardFilename = process.env.INVITATION_CARD_FILENAME
  const cardAttachment =
    (await localInvitationAttachment(
      process.env.INVITATION_CARD_PATH || 'public/invitation-card/invitation-card.pdf',
      cardFilename,
    )) || remoteInvitationAttachment(process.env.INVITATION_CARD_URL, cardFilename)

  const resend = new Resend(apiKey)
  const organiserEmail = await resend.emails.send({
    from,
    to: notificationRecipients,
    replyTo: payload.email,
    subject: `RSVP: ${payload.name} - ${payload.attending === 'yes' ? 'Accepts' : 'Declines'}`,
    html: rsvpNotification(payload),
    text: `New RSVP\n\nName: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || 'Not provided'}\nResponse: ${payload.attending === 'yes' ? 'Joyfully accepts' : 'Regretfully declines'}\nGuests: ${payload.guests}\nMessage: ${payload.message || 'No message provided.'}`,
  })

  if (organiserEmail.error) {
    console.error('Could not send RSVP notification', {
      name: organiserEmail.error.name,
      message: organiserEmail.error.message,
      statusCode: organiserEmail.error.statusCode,
    })
    return Response.json({ error: 'We could not send your RSVP. Please try again shortly.' }, { status: 502 })
  }

  const guestEmail = await resend.emails.send({
    from,
    to: payload.email,
    subject: `Your invitation to ${wedding.bride} & ${wedding.groom}'s wedding`,
    html: invitationEmail(payload.name, Boolean(cardAttachment)),
    text: `Dear ${payload.name},\n\nThank you for sharing your response with us. We are so grateful to have you in our lives and would be honoured to celebrate this special day with you.\n\n${wedding.dateLabel}\n${emailInvitationVenue}\n\n${cardAttachment ? 'Your invitation card is attached to this email.' : 'Your invitation details are included in this email.'}\n\nWith love,\n${wedding.bride} & ${wedding.groom}`,
    attachments: cardAttachment,
  })

  if (guestEmail.error) {
    console.error('Could not send invitation copy', {
      name: guestEmail.error.name,
      message: guestEmail.error.message,
      statusCode: guestEmail.error.statusCode,
    })
    return Response.json({ success: true, invitationSent: false })
  }

  return Response.json({ success: true, invitationSent: true })
}
