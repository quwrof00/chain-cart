import { createServerSupabase } from '@/lib/supabase-server'
import RemoveButtonWrapper from '@/components/RemoveButtonWrapper'
import QuantityButtons from '@/components/QuantityButtons'
import SaveForLaterButton from '@/components/SaveForLaterButton'
import MoveToCartButton from '@/components/MoveToCartButton'
import Link from 'next/link'
import { log } from 'console'

export default async function CartPage() {
  const supabase = await createServerSupabase()
  const { data: {user}} = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center" style={{
        background: `
          linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          #111827
        `,
        backgroundSize: '40px 40px'
      }}>
        <div className="text-center">
          <p className="text-2xl font-semibold text-white animate-[fade-in_1s_ease-out] [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
            Please log in to view your cart.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block px-6 py-2 bg-orange-500/50 text-white rounded-lg hover:bg-orange-500/80 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_10px_rgba(249,115,22,0.3)]"
          >
            Log In
          </Link>
        </div>
      </div>
    )
  }

  const { data: cartItems, error } = await supabase
    .from('cart_items')
    .select('id, quantity, products(id, name, price, image_url)')
    .eq('user_id', user.id)

  const { data: savedItems } = await supabase
    .from('saved_items')
    .select('id, quantity, products(id, name, price, image_url)')
    .eq('user_id', user.id)

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center" style={{
        background: `
          linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          #111827
        `,
        backgroundSize: '40px 40px'
      }}>
        <p className="text-2xl font-semibold text-orange-500 text-center animate-[fade-in_1s_ease-out] [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
          Failed to load cart: {error.message}
        </p>
      </div>
    )
  }

  if ((!cartItems || cartItems.length === 0) && (!savedItems || savedItems?.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center" style={{
        background: `
          linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          #111827
        `,
        backgroundSize: '40px 40px'
      }}>
        <div className="text-center">
          <p className="text-2xl font-semibold text-white animate-[fade-in_1s_ease-out] [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
            Your cart is empty.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block px-6 py-2 bg-orange-500/50 text-white rounded-lg hover:bg-orange-500/80 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_10px_rgba(249,115,22,0.3)]"
          >
            Shop Now
          </Link>
        </div>
      </div>
    )
  }
  console.log(cartItems);
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.products.price, 0)

  return (
    <div className="min-h-screen bg-gray-900 p-8 max-w-5xl mx-auto" style={{
      background: `
        linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
        #111827
      `,
      backgroundSize: '40px 40px'
    }}>
      <h1 className="text-5xl font-extrabold text-white mb-10 text-center animate-[glitch_1.5s_ease-in-out] [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
        Your Cart
      </h1>
      <div className="space-y-6">
        {cartItems.map(item => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4 bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-orange-500/30 rounded-xl p-6 shadow-[0_0_10px_rgba(249,115,22,0.2)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition 대신all duration-300 animate-[glitch-slide_0.8s_ease-out]"
          >
            <div className="flex items-center space-x-6">
              <img
                src={item.products.image_url}
                alt={item.products.name}
                className="w-28 h-28 object-cover rounded-lg opacity-80 [filter:drop-shadow(0_0_8px_rgba(249,115,22,0.3))]"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
                  {item.products.name}
                </h2>
                <div className="flex items-center space-x-4 mt-2">
                  <QuantityButtons itemId={item.id} quantity={item.quantity} />
                  <p className="text-sm text-gray-200 [text-shadow:_0_0_4px_rgba(249,115,22,0.2)]">
                    ${item.products.price.toFixed(2)} each
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right space-y-3">
              <p className="text-lg font-bold text-orange-500 [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
                ${(item.products.price * item.quantity).toFixed(2)}
              </p>
              <div className="flex flex-col space-y-2">
                <RemoveButtonWrapper itemId={item.id} />
                <SaveForLaterButton itemId={item.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-right bg-gray-800/50 p-6 rounded-xl border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
        <p className="text-2xl font-bold text-white mb-4 [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
          Total: ${total.toFixed(2)}
        </p>
        <Link
          href={'/checkout'}
          className="inline-block px-8 py-3 bg-orange-500/50 text-white rounded-lg hover:bg-orange-500/80 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_10px_rgba(249,115,22,0.3)]"
        >
          Proceed to Checkout
        </Link>
      </div>
      {savedItems && savedItems.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center animate-[fade-in_1s_ease-out] [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
            Saved for later
          </h2>
          <div className="space-y-6">
            {savedItems.map(item => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4 bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-orange-500/30 rounded-xl p-6 shadow-[0_0_10px_rgba(249,115,22,0.2)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300 animate-[glitch-slide_0.8s_ease-out]"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={item.products.image_url}
                    alt={item.products.name}
                    className="w-28 h-28 object-cover rounded-lg opacity-80 [filter:drop-shadow(0_0_8px_rgba(249,115,22,0.3))]"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
                      {item.products.name}
                    </h2>
                    <div className="flex items-center space-x-4 mt-2">
                      <QuantityButtons itemId={item.id} quantity={item.quantity} />
                      <p className="text-sm text-gray-200 [text-shadow:_0_0_4px_rgba(249,115,22,0.2)]">
                        ${item.products.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-3">
                  <p className="text-lg font-bold text-orange-500 [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
                    ${(item.products.price * item.quantity).toFixed(2)}
                  </p>
                  <MoveToCartButton itemId={item.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}