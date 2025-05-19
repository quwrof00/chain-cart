'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useLoadingStore } from '@/app/stores/loading-store'

const Navbar = () => {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const isLoading = useLoadingStore((s) => s.isLoading)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    // 🔥 Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    // cleanup
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
    } else {
      setUser(null)
      router.push('/login')
      toast.success('Logged out successfully!')
    }
  }

  return (
    <nav 
      className="bg-black/90 backdrop-blur-md border-b-2 border-indigo-500/50 p-4 fixed w-full top-0 z-50 shadow-[0_0_20px_rgba(79,70,229,0.4)] bg-gradient-to-r from-indigo-500/10 to-transparent"
      style={{
        backgroundImage: `
          linear-gradient(45deg, rgba(79, 70, 229, 0.10) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(79, 70, 229, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '10px 10px'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <Link
          href="/"
          className="text-3xl font-extrabold text-white animate-[glitch_1.5s_ease-in-out] [text-shadow:_0_0_12px_rgba(79,70,229,0.8)] hover:text-teal-400 transition-colors duration-300"
        >
          ChainCart
        </Link>
        {isLoading && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-6 h-6">
            <div className="w-6 h-6 text-white border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-white hover:text-teal-400 transition-colors duration-300 [text-shadow:_0_0_6px_rgba(45,212,191,0.4)]"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-white hover:text-teal-400 transition-colors duration-300 [text-shadow:_0_0_6px_rgba(45,212,191,0.4)]"
          >
            Shop
          </Link>
          <Link
            href="/cart"
            className="text-white hover:text-teal-400 transition-colors duration-300 [text-shadow:_0_0_6px_rgba(45,212,191,0.4)]"
          >
            Cart
          </Link>
          {user ? (
            <>
              <Link
                href="/profile"
                className="text-white hover:text-teal-400 transition-colors duration-300 [text-shadow:_0_0_6px_rgba(45,212,191,0.4)]"
              >
                Profile
              </Link>
              <Link
                href="/orders"
                className="text-white hover:text-teal-400 transition-colors duration-300 [text-shadow:_0_0_6px_rgba(45,212,191,0.4)]"
              >
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500/60 text-white px-4 py-2 rounded-lg hover:bg-red-500/90 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_15px_rgba(239,68,68,0.5)]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white hover:text-teal-400 transition-colors duration-300 [text-shadow:_0_0_6px_rgba(45,212,191,0.4)]"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-indigo-500/60 text-white px-4 py-2 rounded-lg hover:bg-indigo-500/90 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_15px_rgba(79,70,229,0.6)]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar