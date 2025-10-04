'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { type WaitlistFormState } from '@/app/actions/waitlist-form-state'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitWaitlistAction(
  _prevState: WaitlistFormState,
  formData: FormData,
): Promise<WaitlistFormState> {
  const name = formData.get('name')
  const email = formData.get('email')
  const useCase = formData.get('useCase')

  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return {
      status: 'error',
      message: 'Please enter a valid email address.',
    }
  }

  const trimmedName = typeof name === 'string' ? name.trim() : ''
  const trimmedUseCase = typeof useCase === 'string' ? useCase.trim() : ''

  try {
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase.from('waitlist_signups').insert({
      name: trimmedName || null,
      email,
      use_case: trimmedUseCase || null,
      submitted_at: new Date().toISOString(),
    })

    if (error) {
      console.error('[submitWaitlistAction] Supabase insert error', error)
      return {
        status: 'error',
        message: 'Unable to join the waitlist right now. Please try again shortly.',
      }
    }

    return {
      status: 'success',
      message: "You're on the list! We'll keep you posted.",
    }
  } catch (error) {
    console.error('[submitWaitlistAction] Unexpected error', error)
    return {
      status: 'error',
      message: 'Something went wrong while submitting the form. Please retry.',
    }
  }
}
