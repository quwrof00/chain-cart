'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function PlaceOrderButton({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    setLoading(true)

    const res = await fetch('/api/place-order', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    })

    setLoading(false)

    if (res.ok) {
      alert('Order placed successfully!')
      router.push('/success');
    } else {
      alert('Failed to place order')
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded-md"
    >
      {loading ? 'Placing Order...' : 'Place Order'}
    </button>
  )
}
