import { AdminLogin } from '@/components/admin/admin-login'
import { InvitationManager } from '@/components/admin/invitation-manager'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { supabaseServer } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) return <AdminLogin />

  const { data: invitations, error } = await supabaseServer()
    .from('invitations')
    .select('id, name, phone, allowed_guests, invite_token, rsvp_status, rsvp_attendee_count, created_at')
    .order('created_at', { ascending: false })

  if (error) throw new Error('Could not load invitations.')

  return <InvitationManager initialInvitations={invitations || []} />
}
