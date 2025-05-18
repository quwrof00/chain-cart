import { createServerSupabase } from '@/lib/supabase-server'
import DeleteAccountButton from '@/components/DeleteAccountButton'
import Link from 'next/link'

export default async function ProfilePage() {
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
            Please log in to view your profile.
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

  // Fetch order history
  const { data: orders, error } = await supabase
    .from('orders')
    .select('id, created_at, total')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-900 p-8 max-w-3xl mx-auto" style={{
      background: `
        linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
        #111827
      `,
      backgroundSize: '40px 40px'
    }}>
      <h1 className="text-5xl font-extrabold text-white mb-10 text-center animate-[glitch_1.5s_ease-in-out] [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
        Your Profile
      </h1>
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-orange-500/30 rounded-xl p-6 shadow-[0_0_10px_rgba(249,115,22,0.2)] animate-[glitch-slide_0.8s_ease-out]">
        <div className="mb-6">
          <p className="text-lg font-semibold text-white [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
            <span className="text-orange-500">Email:</span> {user.email}
          </p>
        </div>
        <div className="flex justify-between mb-6 h-10">
          <h2 className="text-3xl font-semibold text-white [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
            Order History
          </h2>
          <Link
            href={'/orders'}
            className="px-4 py-2 bg-orange-500/50 text-white rounded-lg hover:bg-orange-500/80 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_10px_rgba(249,115,22,0.3)]"
          >
            View All Orders
          </Link>
        </div>
        
        {error && (
          <p className="text-lg text-orange-500 text-center animate-[fade-in_1s_ease-out] [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
            Failed to load orders: {error.message}
          </p>
        )}
        {orders && orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.map(order => (
              <li
                key={order.id}
                className="flex justify-between items-center bg-gray-800/50 p-4 rounded-lg border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.2)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300"
              >
                <div>
                  <p className="text-lg font-semibold text-white [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
                    Order ID: {order.id}
                  </p>
                  <p className="text-sm text-gray-200 [text-shadow:_0_0_4px_rgba(249,115,22,0.2)]">
                    Date: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-lg font-medium text-orange-500 [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
                  ${order.total.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-white text-center animate-[fade-in_1s_ease-out] [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
            You have no orders yet.
          </p>
        )}

        <div className="mt-8 text-right">
          <DeleteAccountButton
            userId={user.id}
          />
        </div>
      </div>
    </div>
  )
}