import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <div 
      className="p-8 flex flex-col items-center justify-center text-center min-h-[60vh] bg-black/90 bg-gradient-to-r from-indigo-500/10 to-transparent"
      style={{
        backgroundImage: `
          linear-gradient(45deg, rgba(79, 70, 229, 0.10) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(79, 70, 229, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '10px 10px'
      }}
    >
      <div className="p-6 bg-gray-900/80 backdrop-blur-md rounded-lg border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
        <h1 
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500 mb-4 animate-[bounce_0.6s_ease-in-out] [text-shadow:_0_0_10px_rgba(79,70,229,0.5)]"
        >
          🎉 Order Placed!
        </h1>
        <p className="text-lg text-gray-200 mb-6">
          Your order has been successfully placed. Thank you for shopping with us!
        </p>
        <Link
          href="/orders"
          className="px-6 py-3 bg-gradient-to-r from-teal-400 to-indigo-500 text-white rounded-md hover:from-teal-300 hover:to-indigo-600 hover:scale-105 animate-pulse transition-all duration-300 [box-shadow:_0_0_10px_rgba(79,70,229,0.3)] hover:[box-shadow:_0_0_15px_rgba(79,70,229,0.5)]"
        >
          View All Orders
        </Link>
      </div>
    </div>
  )
}