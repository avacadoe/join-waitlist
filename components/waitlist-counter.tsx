'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { getWaitlistCount } from '@/app/actions/get-waitlist-count'

export function WaitlistCounter() {
  const [count, setCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch initial count
    const fetchInitialCount = async () => {
      try {
        const initialCount = await getWaitlistCount()
        setCount(initialCount)
      } catch (error) {
        console.error('Failed to fetch initial count:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialCount()

    // Subscribe to real-time updates
    const supabase = createSupabaseBrowserClient()
    const channel = supabase
      .channel('waitlist_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'waitlist_signups',
        },
        () => {
          setCount((prev) => prev + 1)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className="relative flex items-center min-w-full justify-center"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '12px',
          border: '2px solid #FF6B6B',
          backgroundColor: '#FFF9F9',
          boxShadow: '0 8px 24px rgba(255, 107, 107, 0.15)',
        }}
      >
        <div className="text-center">
          <div
            className="text-4xl font-bold"
            style={{
              color: '#FF6B6B',
              fontFamily:
                "'Scto Grotesk A', Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            {isLoading ? '...' : (count + 100).toLocaleString() + "+"}
          </div>
          <div
            className="mt-1 text-xs uppercase tracking-widest"
            style={{
              color: '#FF6B6B',
              fontFamily: "JetBrains Mono, Monaco, 'Courier New', monospace",
              letterSpacing: '0.16em',
              opacity: 0.7,
            }}
          >
            Members 
          </div>
        </div>
      </div>
    </div>
  )
}
