import 'dotenv/config'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, )

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function syncProducts() {
  const { data: products } = await supabase
    .from('products')
    .select('id, name, price, stripe_price_id')

  for (const product of products ?? []) {
    if (product.stripe_price_id) {
      console.log(`⏩ Skipping ${product.name}`)
      continue
    }

    const stripeProduct = await stripe.products.create({ name: product.name })

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(product.price * 100),
      currency: 'usd',
    })

    await supabase
      .from('products')
      .update({ stripe_price_id: stripePrice.id })
      .eq('id', product.id)

    console.log(`✅ Synced ${product.name}`)
  }

  console.log('🎉 All done')
}

syncProducts().catch(console.error)
