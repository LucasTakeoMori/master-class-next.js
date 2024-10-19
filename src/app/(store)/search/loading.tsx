

import { Skeleton } from '@/components/ui/skeleton'
import CurrentSearch from './current-search'
import { Suspense } from 'react'

export default function LoadingSearch() {


  return (
    <div className="flex flex-col gap-4 ">
      
      <Suspense fallback={null}>
        <CurrentSearch />
      </Suspense>

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
