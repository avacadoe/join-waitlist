'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getWaitlistCount(): Promise<number> {
  try {
    const supabase = await createSupabaseServerClient()

    const { count, error } = await supabase
      .from('waitlist_signups')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('[getWaitlistCount] Supabase query error', error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error('[getWaitlistCount] Unexpected error', error)
    return 0
  }
}
