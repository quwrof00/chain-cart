'use client'

import { supabase } from "@/lib/supabase-client"

export default function LoginButton() {
  const handleLogin = async () => {

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google', // or 'github', 'discord', etc.
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) console.error('OAuth sign in error:', error.message)
  }

  return (
    <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
      Continue with Google
    </button>
  )
}
