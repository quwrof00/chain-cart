import Link from 'next/link'
import { createServerSupabase } from '@/lib/supabase-server'
import SearchInput from '@/components/SearchInput'
import CategorySelect from '@/components/CategorySelect'

const PRODUCTS_PER_PAGE = 9 //max products to be displayed on a page

export default async function ProductsPage({ searchParams }: { searchParams: { search?: string; page?: string; category?: string }}) {
  const searchParams2 = await searchParams;
  const page = parseInt(searchParams2.page || '1'); //get page no.
  const from = (page - 1) * PRODUCTS_PER_PAGE; //start range of products to fetch
  const to = from + PRODUCTS_PER_PAGE - 1; //end range 
  const category = searchParams2.category || '';
  const searchQuery = (searchParams2.search || '').trim();

  const supabase = await createServerSupabase();

  let query = supabase.from('products').select('*', { count: 'exact' })

  // Apply category filter only if category param exists and is not equal to 'all'
  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  // Apply search filter if search query exists
  if (searchQuery) {
    // ilike for case-insensitive partial matching
    query = query.ilike('name', `%${searchQuery}%`)
  }

  // Apply pagination after filters
  query = query.range(from, to)
  
  const { data: products, error, count } = await query;

  if (error) {
    return (
      <div
        className="min-h-screen bg-gray-900 p-8 flex items-center justify-center"
        style={{
          background: `
            linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
            #111827
          `,
          backgroundSize: '40px 40px',
        }}
      >
        <p className="text-2xl font-semibold text-orange-500 text-center animate-[fade-in_1s_ease-out] [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
          Failed to load products.
        </p>
      </div>
    )
  }

  const filteredProducts = products || []
  const totalPages = Math.ceil((count || 0) / PRODUCTS_PER_PAGE)

  return (
    <div
      className="min-h-screen bg-gray-900 p-8"
      style={{
        background: `
          linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
          #111827
        `,
        backgroundSize: '40px 40px',
      }}
    >
      {/* Search + Category Filter */}
      <div className="max-w-xl mx-auto mb-8 flex items-center gap-3">
        <SearchInput />
        <CategorySelect />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-2xl font-semibold text-white text-center animate-[fade-in_1s_ease-out] [text-shadow:_0_0_8px_rgba(249,115,22,0.5)]">
          No products found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="relative bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-orange-500/30 rounded-xl p-4 shadow-[0_0_10px_rgba(249,115,22,0.2)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300 animate-[glitch-slide_0.8s_ease-out] block"
              >
                <img
                  src={product.image_url || '/placeholder-image.png'}
                  alt={product.name || 'Product Image'}
                  className="w-full h-40 object-cover rounded-lg mb-2 opacity-80 [filter:drop-shadow(0_0_8px_rgba(249,115,22,0.3))]"
                />
                <h2 className="text-xl font-semibold text-white [text-shadow:_0_0_5px_rgba(249,115,22,0.3)]">
                  {product.name || 'Unnamed Product'}
                </h2>
                <p className="text-orange-500 font-medium">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
                </p>
                <p className="text-sm text-gray-200 mt-2 line-clamp-2">
                  {product.description || 'No description available.'}
                </p>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-10">
            {page > 1 && (
              <Link
                href={`?page=${page - 1}${
                  searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
                }${category && category !== 'all' ? `&category=${category}` : ''}`}
                className="text-orange-400 hover:underline"
              >
                ← Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`?page=${page + 1}${
                  searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
                }${category && category !== 'all' ? `&category=${category}` : ''}`}
                className="text-orange-400 hover:underline"
              >
                Next →
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )
}
