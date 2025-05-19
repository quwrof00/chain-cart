'use client'

import { useState } from 'react'
import { BrowserProvider, parseEther } from 'ethers'
import { useRouter } from 'next/navigation'
import { CONTRACT_ADDRESS } from '@/lib/web3-config'
import { supabase } from '@/lib/supabase-client'

export default function CryptoButton({ total }: { total: number }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    alert('MetaMask not found')
    return
  }

  try {
    setLoading(true)

    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    const tx = await signer.sendTransaction({
      to: CONTRACT_ADDRESS,
      value: parseEther(0.0001.toString()),
    })

    await tx.wait()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      alert('User not logged in')
      return
    }

    const res = await fetch('/api/place-order', {
      method: 'POST',
      body: JSON.stringify({ userId: user.id }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Failed to place order')
    }

    alert('Order placed successfully!')
    router.push('/success')
  } catch (error: any) {
    console.error(error)
    alert('Payment failed: ' + error.message)
  } finally {
    setLoading(false)
  }
}


  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="inline-block px-8 py-3 bg-indigo-500/60 text-white rounded-lg hover:bg-indigo-500/90 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_15px_rgba(79,70,229,0.6)]"
    >
      {loading ? 'Processing...' : 'Pay with Crypto'}
    </button>
  )
}
