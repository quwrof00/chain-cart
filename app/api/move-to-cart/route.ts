import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const { itemId } = await req.json()
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { data: savedItem, error } = await supabase
    .from('saved_items')
    .select('product_id, quantity')
    .eq('id', itemId)
    .eq('user_id', user.id)
    .single()

  if (error || !savedItem)
    return NextResponse.json({ error: 'Item not found in saved list' }, { status: 404 })

  await supabase.from('cart_items').insert({
    product_id: savedItem.product_id,
    user_id: user.id,
    quantity: savedItem.quantity,
  })

  await supabase.from('saved_items').delete().eq('id', itemId)

  return NextResponse.json({ success: true })
}
