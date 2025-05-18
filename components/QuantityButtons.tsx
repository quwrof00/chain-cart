'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase-client'

interface QuantityButtonsProps {
  itemId: number
  quantity: number
}

export default function QuantityButtons({ itemId, quantity }: QuantityButtonsProps) {
  const [loading, setLoading] = useState(false)

  const updateQuantity = async (delta: number) => {
    const newQty = quantity + delta
    if (newQty < 1) return // Optional: prevent going below 1

    setLoading(true)
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: newQty })
      .eq('id', itemId)

    const { error: savedError } = await supabase
    .from('saved_items')
    .update({quantity: newQty})
    .eq('id', itemId)

    setLoading(false)
    if (error && savedError) {
      alert('Failed to update quantity')
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="flex items-center space-x-3 mt-2">
      <button
        onClick={() => updateQuantity(-1)}
        disabled={loading}
        className={`w-10 h-10 flex items-center justify-center bg-indigo-500/50 text-white rounded-full hover:bg-indigo-500/80 hover:scale-110 transition-all duration-300 [box-shadow:_0_0_10px_rgba(79,70,229,0.5)] ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        -
      </button>
      <span className="text-lg font-medium text-teal-400 [text-shadow:_0_0_5px_rgba(45,212,191,0.3)]">
        {quantity}
      </span>
      <button
        onClick={() => updateQuantity(1)}
        disabled={loading}
        className={`w-10 h-10 flex items-center justify-center bg-indigo-500/50 text-white rounded-full hover:bg-indigo-500/80 hover:scale-110 transition-all duration-300 [box-shadow:_0_0_10px_rgba(79,70,229,0.5)] ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        +
      </button>
    </div>
  )
}