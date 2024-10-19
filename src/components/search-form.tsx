'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { FormEvent } from 'react'

export default function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSeacrh(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return null
    }

    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSeacrh}
      className="flex w-[320px] item-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <Search className="w-5 h-5 text-zinc-500" />

      <input
        name="q"
        placeholder="Buscar produtos..."
        className=" flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        defaultValue={query ?? ''}
        required
      />
    </form>
  )
}
