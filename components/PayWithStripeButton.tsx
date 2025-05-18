'use client'

import { useState } from 'react'

interface CartItem {
  id: string
  quantity: number
  products: {
    id: string
    name: string
    price: number
    stripe_price_id: string | null
  }
}

interface Props {
  userId: string
  cartItems: CartItem[]
  total: number
}

export default function PayWithStripeButton({ userId, cartItems, total }: Props) {
  const [loading, setLoading] = useState(false)

  const hasStripeItems = cartItems.some(item => item.products.stripe_price_id)

  async function handleCheckout() {
    setLoading(true)

    const line_items = cartItems
      .filter(item => item.products.stripe_price_id)
      .map(item => ({
        price: item.products.stripe_price_id!,
        quantity: item.quantity,
      }))

    if (line_items.length === 0) {
      alert('No products have Stripe price IDs set!')
      setLoading(false)
      return
    }

    try {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ line_items }),
  })

  const text = await res.text()
  console.log('Raw response text:', text)

  const data = JSON.parse(text)

  if (data.url) {
    window.location.href = data.url
  } else {
    alert('Error creating Stripe checkout session')
    setLoading(false)
  }
} catch (error) {
  alert('Error: ' + (error as Error).message)
  setLoading(false)
}

  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || !hasStripeItems}
      className="inline-block px-8 py-3 bg-green-500/60 text-white rounded-lg hover:bg-green-500/90 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_15px_rgba(34,197,94,0.6)]
"
    >
      {loading ? 'Loading...' : `Pay with Card`}
    </button>
  )
}
