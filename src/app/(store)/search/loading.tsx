'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useSearchParams } from 'next/navigation'

export default function LoadingSearch() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  return (
    <div className="flex flex-col gap-4 ">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[388px] bg-zinc-50/10" />
        <Skeleton className="h-[388px] bg-zinc-50/10" />
        <Skeleton className="h-[388px] bg-zinc-50/10" />
        <Skeleton className="h-[388px] bg-zinc-50/10" />
        <Skeleton className="h-[388px] bg-zinc-50/10" />
        <Skeleton className="h-[388px] bg-zinc-50/10" />
      </div>
    </div>
  )
}
