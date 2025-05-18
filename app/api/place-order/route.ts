import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const { userId } = await req.json()
  const supabase = await createServerSupabase()

  const { data: cartItems } = await supabase
    .from('cart_items')
    .select('id, quantity, product_id, products(price)')
    .eq('user_id', userId)

  if (!cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.products.price,
    0
  )

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({ user_id: userId, total })
    .select()
    .single()

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 })
  }

  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.products.price,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 })
  }

  await supabase.from('cart_items').delete().eq('user_id', userId)

  return NextResponse.json({ success: true })
}
