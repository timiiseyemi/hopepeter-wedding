create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  allowed_guests integer not null default 1 check (allowed_guests between 1 and 20),
  invite_token text not null unique,
  rsvp_status text not null default 'pending' check (rsvp_status in ('pending', 'attending', 'declined')),
  rsvp_attendee_count integer check (rsvp_attendee_count between 0 and 20),
  rsvp_phone text,
  rsvp_message text,
  responded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists invitations_updated_at on public.invitations;
create trigger invitations_updated_at
before update on public.invitations
for each row execute procedure public.set_updated_at();
