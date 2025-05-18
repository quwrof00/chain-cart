import { createServerSupabase } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function OrdersPage() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

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
            Please log in to view your orders.
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

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      id,
      created_at,
      order_items (
        quantity,
        products (
          name,
          price,
          image_url
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

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
          Failed to load orders: {error.message}
        </p>
      </div>
    )
  }

  if (!orders || orders.length === 0) {
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
            You haven't placed any orders yet.
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
        Your Orders
      </h1>
      <div className="space-y-8">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-orange-500/30 rounded-xl p-6 shadow-[0_0_10px_rgba(249,115,22,0.2)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300 animate-[glitch-slide_0.8s_ease-out]"
          >
            <p className="text-sm text-gray-200 mb-4 [text-shadow:_0_0_4px_rgba(249,115,22,0.2)]">
              Order placed on {new Date(order.created_at).toLocaleString()}
            </p>
            <div className="space-y-4">
              {order.order_items.map(item => (
                <div
                  key={item.products.name}
                  className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-lg border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.2)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300"
                >
                  <img
                    src={item.products.image_url}
                    alt={item.products.name}
                    className="w-16 h-16 object-cover rounded-md opacity-80 [filter:drop-shadow(0_0_8px_rgba(249,115,22,0.3))]"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-white [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
                      {item.products.name} <span className="text-orange-500">×{item.quantity}</span>
                    </p>
                    <p className="text-sm text-gray-200 [text-shadow:_0_0_4px_rgba(249,115,22,0.2)]">
                      ${item.products.price.toFixed(2)} each
                    </p>
                  </div>
                  <p className="text-lg font-medium text-orange-500 [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
                    ${(item.products.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right bg-gray-800/50 p-4 rounded-lg border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
              <p className="text-xl font-bold text-white [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
                Total: $
                {order.order_items
                  .reduce((sum, item) => sum + item.quantity * item.products.price, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}