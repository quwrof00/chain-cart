'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

export default function MoveToCartButton({ itemId }: { itemId: number }) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const res = await fetch('/api/move-to-cart', {
        method: 'POST',
        body: JSON.stringify({ itemId }),
      })

      if (res.ok) {
        toast.success('Moved to cart')
        window.location.reload()
      } else {
        const { error } = await res.json()
        toast.error(error || 'Failed to move item')
      }
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`px-4 py-2 bg-indigo-500/50 text-white rounded-lg hover:bg-indigo-500/80 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_10px_rgba(79,70,229,0.5)] ${
        isPending ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isPending ? 'Moving...' : 'Move to cart'}
    </button>
  )
}