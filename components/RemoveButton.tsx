'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase-client'

interface RemoveButtonProps {
  itemId: number
  onRemove: (id: number) => void
}

export default function RemoveButton({ itemId, onRemove }: RemoveButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleRemove = async () => {
    setLoading(true)
    const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId);
    
    setLoading(false)

    if (error) {
      alert('Failed to remove item')
      return
    }
    window.location.reload()

    onRemove(itemId)
  }

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      className={`px-4 py-2 bg-indigo-500/50 text-white rounded-lg hover:bg-indigo-500/80 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_10px_rgba(79,70,229,0.5)] ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Removing...' : 'Remove'}
    </button>
  )
}