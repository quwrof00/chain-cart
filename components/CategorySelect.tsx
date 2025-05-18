'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function CategorySelect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current category and search from URL params
  const currentCategory = searchParams.get('category') || 'all'
  const searchQuery = searchParams.get('search') || ''

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value
    const params = new URLSearchParams()

    if (val && val !== 'all') {
      params.set('category', val)
    }
    if (searchQuery) {
      params.set('search', searchQuery)
    }
    // Reset page to 1 on category change
    params.set('page', '1')

    router.push(`?${params.toString()}`)
  }

  return (
    <select
      className="p-2 rounded-md border border-indigo-500/30 focus:outline-none focus:border-indigo-500/80 focus:shadow-[0_0_10px_rgba(79,70,229,0.5)] transition-all duration-300 [text-shadow:_0_0_4px_rgba(45,212,191,0.3)] bg-gray-800 text-white cursor-pointer min-w-[120px]"
      onChange={onChange}
      value={currentCategory}
    >
      <option value="all">All</option>
      <option value="tech">Tech</option>
      <option value="clothes">Clothes</option>
      <option value="beauty">Beauty</option>
      <option value="groceries">Groceries</option>
      <option value="other">Other</option>
    </select>
  )
}
