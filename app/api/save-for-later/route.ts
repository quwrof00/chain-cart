import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const { itemId } = await req.json()
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { data: cartItem, error } = await supabase
    .from('cart_items')
    .select('product_id, quantity')
    .eq('id', itemId)
    .eq('user_id', user.id)
    .single()

  if (error || !cartItem)
    return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 })

  // Insert into saved_items
  await supabase.from('saved_items').insert({
    product_id: cartItem.product_id,
    user_id: user.id,
    quantity: cartItem.quantity,
  })

  // Remove from cart_items
  await supabase.from('cart_items').delete().eq('id', itemId)

  return NextResponse.json({ success: true })
}
