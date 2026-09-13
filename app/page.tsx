import { WeddingHome } from '@/components/wedding/home'
import { supabaseServer } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }: { searchParams: Promise<{ invite?: string | string[] }> }) {
  const { invite } = await searchParams
  const token = typeof invite === 'string' ? invite : ''

  if (!token) return <WeddingHome invitation={null} invitationState="none" />
  if (!/^[a-f0-9]{32}$/.test(token)) return <WeddingHome invitation={null} invitationState="invalid" />

  const { data: invitation, error } = await supabaseServer()
    .from('invitations')
    .select('name, phone, allowed_guests')
    .eq('invite_token', token)
    .maybeSingle()

  if (error) throw new Error('Could not verify invitation.')

  return (
    <WeddingHome
      invitation={invitation ? { token, name: invitation.name, phone: invitation.phone || '', allowedGuests: invitation.allowed_guests } : null}
      invitationState={invitation ? 'valid' : 'invalid'}
    />
  )
}
