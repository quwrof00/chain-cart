import { createServerSupabase } from '@/lib/supabase-server'
import AddToCartButton from '@/components/AddToCartButton';

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabase();
  const params2 = await params;
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params2.id)
    .single()

  if (error || !product) {
    return (
      <div 
        className="p-6 text-white text-center text-xl bg-gray-900 animate-[fade-in_1s_ease-out]" 
        style={{
          background: `
            linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
            #111827
          `,
          backgroundSize: '40px 40px'
        }}
      >
        Product not found.
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen bg-gray-900 p-6 flex items-center justify-center" 
      style={{
        background: `
          linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          #111827
        `,
        backgroundSize: '40px 40px'
      }}
    >
      <div className="max-w-2xl w-full bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-orange-500/30 rounded-xl p-8 shadow-[0_0_10px_rgba(249,115,22,0.2)] animate-[glitch-slide_0.8s_ease-out]">
        <h1 className="text-5xl font-extrabold text-white mb-6 text-center animate-[glitch_1.5s_ease-in-out] [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
          {product.name}
        </h1>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg mb-6 opacity-80 [filter:drop-shadow(0_0_8px_rgba(249,115,22,0.3))]"
        />
        <p className="text-2xl text-orange-500 font-medium text-center mb-4 [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-lg text-gray-200 mb-6 text-center">{product.description}</p>

        <div className="flex justify-center">
          <AddToCartButton
            productId={product.id}
          />
        </div>
      </div>
    </div>
  )
}