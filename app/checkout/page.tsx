import { createServerSupabase } from '@/lib/supabase-server'
import PayWithCryptoButton from '@/components/PayWithCryptoButton'
import PayWithStripeButton from '@/components/PayWithStripeButton'  // <--- import here
import Link from 'next/link'

export default async function CheckoutPage() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="min-h-screen bg-black p-8 flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.2)_0%,_rgba(0,0,0,1)_70%)]">
        <div className="text-center">
          <p className="text-2xl font-semibold text-white animate-[fade-in_1s_ease-out] [text-shadow:_0_0_10px_rgba(79,70,229,0.7)]">
            Please log in to checkout.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block px-6 py-2 bg-indigo-500/50 text-white rounded-lg hover:bg-indigo-500/80 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_15px_rgba(79,70,229,0.5)]"
          >
            Log In
          </Link>
        </div>
      </div>
    )
  }

  const { data: cartItems, error } = await supabase
    .from('cart_items')
    .select('id, quantity, products(id, name, price, stripe_price_id)')
    .eq('user_id', user.id)

  if (error || !cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black p-8 flex items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.2)_0%,_rgba(0,0,0,1)_70%)]">
        <div className="text-center">
          <p className="text-2xl font-semibold text-white animate-[fade-in_1s_ease-out] [text-shadow:_0_0_10px_rgba(79,70,229,0.7)]">
            {error ? `Error: ${error.message}` : 'Your cart is empty.'}
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block px-6 py-2 bg-indigo-500/50 text-white rounded-lg hover:bg-indigo-500/80 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_15px_rgba(79,70,229,0.5)]"
          >
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.products.price,
    0
  )

  return (
    <div className="min-h-screen bg-black p-8 max-w-4xl mx-auto bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.2)_0%,_rgba(0,0,0,1)_70%)]">
      <h1 className="text-5xl font-extrabold text-white mb-10 text-center animate-[glitch_1.5s_ease-in-out] [text-shadow:_0_0_12px_rgba(79,70,229,0.8)]">
        Order Summary
      </h1>
      <div className="bg-gradient-to-b from-gray-950 to-black border-2 border-indigo-500/50 rounded-xl p-6 shadow-[0_0_20px_rgba(79,70,229,0.4)] animate-[glitch-slide_0.8s_ease-out]">
        <ul className="mb-6 space-y-4">
          {cartItems.map(item => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-950/50 p-4 rounded-lg border border-indigo-500/30 shadow-[0_0_10px_rgba(79,70,229,0.2)] hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all duration-300"
            >
              <div>
                <p className="text-lg font-semibold text-white [text-shadow:_0_0_6px_rgba(79,70,229,0.6)]">
                  {item.products.name} <span className="text-teal-400">x{item.quantity}</span>
                </p>
                <p className="text-sm text-teal-400 [text-shadow:_0_0_4px_rgba(45,212,191,0.3)]">
                  ${item.products.price.toFixed(2)} each
                </p>
              </div>
              <p className="text-lg font-medium text-teal-400 [text-shadow:_0_0_5px_rgba(45,212,191,0.3)]">
                ${(item.products.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
        <div className="text-right bg-gray-950/50 p-4 rounded-lg border border-indigo-500/30 shadow-[0_0_10px_rgba(79,70,229,0.2)] flex justify-end gap-2">
          <PayWithCryptoButton
            userId={user.id}
            cartItems={cartItems}
            total={total}
          />
          <PayWithStripeButton
            userId={user.id}
            cartItems={cartItems}
            total={total}
          />
        </div>
      </div>
    </div>
  )
}
