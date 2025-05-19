import { createServerSupabase } from '@/lib/supabase-server'
import DeleteAccountButton from '@/components/DeleteAccountButton'
import Link from 'next/link'

export default async function ProfilePage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  // Get view from query params, default to 'all-time'
  const view = searchParams.view === 'last-30-days' ? 'last-30-days' : 'all-time'

  // Total orders and money spent all-time
  const { data: ordersDataAT, count: ordersCountAT, error: ordersErrorAT } = await supabase
    .from('orders')
    .select('total', { count: 'exact' })
    .eq('user_id', user?.id)

  const totalMoneySpentAT = ordersDataAT?.reduce((acc, orderDataAT) => acc + orderDataAT.total, 0) || 0

  // Total orders and money spent last 30 days
  const lastThirtyDays = new Date()
  lastThirtyDays.setDate(lastThirtyDays.getDate() - 30)

  const { data: ordersData, count: ordersCount, error: ordersError } = await supabase
    .from('orders')
    .select('total', { count: 'exact' })
    .eq('user_id', user?.id)
    .gte('created_at', lastThirtyDays.toISOString())

  const totalMoneySpent = ordersData?.reduce((acc, orderData) => acc + orderData.total, 0) || 0

  if (!user) {
    return (
      <div className="min-h-screen h-full w-full bg-gray-900 p-4 sm:p-8 flex items-center justify-center" style={{
        background: `
          linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          #111827
        `,
        backgroundSize: '40px 40px'
      }}>
        <div className="text-center">
          <p className="text-2xl font-semibold text-white [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
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
    <div className="min-h-screen h-full w-full bg-gray-900 p-4 sm:p-8" style={{
      background: `
        linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
        #111827
      `,
      backgroundSize: '40px 40px'
    }}>
      <h1 className="text-5xl font-extrabold text-white mb-10 text-center [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
        Your Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* User Info & Stats */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-orange-500/30 rounded-xl p-6 shadow-[0_0_10px_rgba(249,115,22,0.2)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300">
          <h2 className="text-3xl font-semibold text-white mb-6 [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
            Account Overview
          </h2>
          <p className="text-lg font-semibold text-white mb-4 [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
            <span className="text-orange-500">Email:</span> {user.email}
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center mb-6">
            <span className="text-white mr-4 [text-shadow:_0_0_4px_rgba(249,115,22,0.2)]">
              Time Period
            </span>
            <form className="flex">
              <button
                type="submit"
                name="view"
                value="all-time"
                className={`px-4 py-2 rounded-l-full ${view === 'all-time' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-200'} hover:bg-orange-500/80 transition-all duration-300`}
              >
                All Time
              </button>
              <button
                type="submit"
                name="view"
                value="last-30-days"
                className={`px-4 py-2 rounded-r-full ${view === 'last-30-days' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-200'} hover:bg-orange-500/80 transition-all duration-300`}
              >
                Last 30 Days
              </button>
            </form>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-800/50 p-6 sm:p-8 rounded-lg border border-orange-500/30 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center h-40 sm:h-48">
              <p className="text-base sm:text-lg text-gray-200 mb-2 [text-shadow:_0_0_4px_rgba(249,115,22,0.2)]">
                Total Orders
              </p>
              <p className="text-4xl sm:text-5xl font-bold text-orange-500 [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
                {view === 'all-time' ? ordersCountAT : ordersCount}
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 sm:p-8 rounded-lg border border-orange-500/30 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center h-40 sm:h-48">
              <p className="text-base sm:text-lg text-gray-200 mb-2 [text-shadow:_0_0_4px_rgba(249,115,22,0.2)]">
                Total Spent
              </p>
              <p className="text-4xl sm:text-5xl font-bold text-orange-500 [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
                ${view === 'all-time' ? totalMoneySpentAT.toFixed(2) : totalMoneySpent.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-orange-500/30 rounded-xl p-6 shadow-[0_0_10px_rgba(249,115,22,0.2)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-white [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
              Order History
            </h2>
            <Link
              href="/orders"
              className="px-4 py-2 bg-orange-500/50 text-white rounded-lg hover:bg-orange-500/80 hover:scale-105 transition-all duration-300 [box-shadow:_0_0_10px_rgba(249,115,22,0.3)]"
            >
              View All Orders
            </Link>
          </div>

          {error && (
            <p className="text-lg text-orange-500 text-center [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
              Failed to load orders: {error.message}
            </p>
          )}
          {orders && orders.length > 0 ? (
            <ul className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
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
            <p className="text-lg text-white text-center [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
              You have no orders yet.
            </p>
          )}
        </div>
      </div>

      {/* Settings Section */}
      <div className="mt-8 text-right">
        <DeleteAccountButton userId={user.id} />
      </div>
    </div>
  )
}