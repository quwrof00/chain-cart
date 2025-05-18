'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteAccountButton({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )
    if (!confirmed) return

    setLoading(true)

    try {
      const res = await fetch('/api/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText)
      }

      alert('Account deleted successfully.')
      router.push('/')
    } catch (err: any) {
      alert('Failed to delete account: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-block px-6 py-2 bg-red-500/50 text-white rounded-lg hover:bg-red-500/80 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_15px_rgba(239,68,68,0.5)]"
    >
      {loading ? 'Deleting...' : 'Delete Account'}
    </button>
  )
}
