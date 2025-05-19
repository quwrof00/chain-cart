'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import toast from 'react-hot-toast'

export default function AddToCartButton({ productId }: { productId: number }) {
  const [isAdded, setIsAdded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkCart = async () => {

      //check if user has logged in
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return setLoading(false)

      //check if user has already added the item to his current cart 
      const { data: cartItems } = await supabase
        .from('cart_items')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .limit(1)

      if (cartItems && cartItems.length > 0) {
        setIsAdded(true)
      }

      setLoading(false)
    }

    checkCart();
  }, [productId])

  //add item to cart
  const handleAddToCart = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return alert('Please log in')

    //insert item along with user id and product id with default val of 1
    const { error } = await supabase.from('cart_items').insert({
      user_id: user.id,
      product_id: productId,
      quantity: 1,
    })

    if (error) {
      console.error('Add to cart failed:', error)
      toast.error('Failed to add to cart')
    } else {
      setIsAdded(true)
      toast.success('Added to cart')
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded || loading}
      className={`mt-2 px-4 py-2 rounded-md text-white bg-indigo-500/50 text-white px-6 py-3 rounded-lg hover:bg-indigo-500/80 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_15px_rgba(79,70,229,0.5)] ${
        isAdded ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {loading ? 'Checking...' : isAdded ? 'Added to Cart' : 'Add to Cart'}
    </button>
  )
}
