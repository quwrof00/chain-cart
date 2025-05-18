// app/auth/callback/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push('/') // redirect wherever you want
      }
    })
  }, [router])

  return <p>Signing in...</p>
}
