'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSearch = useRef(searchParams.get('search') || '')
  const [searchQuery, setSearchQuery] = useState(initialSearch.current)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams)
      const currentSearch = params.get('search') || ''

      // If search has changed, reset page to 1
      if (searchQuery !== currentSearch) {
        if (searchQuery) {
          params.set('search', searchQuery)
        } else {
          params.delete('search')
        }
        params.set('page', '1')
        router.push(`/products?${params.toString()}`, { scroll: false })
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  return (
    <input
      type="text"
      placeholder="Search products..."
      className="w-full px-4 py-3 bg-gray-950/50 text-white border border-indigo-500/30 rounded-lg focus:outline-none focus:border-indigo-500/80 focus:shadow-[0_0_10px_rgba(79,70,229,0.5)] transition-all duration-300 [text-shadow:_0_0_4px_rgba(45,212,191,0.3)]"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  )
}
