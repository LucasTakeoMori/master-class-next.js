import { Skeleton } from '@/components/ui/skeleton'

export default function HomeLoading() {
  return (
    <div className="grid h-full grid-cols-9 grid-rows-6 gap-6">
      <Skeleton className="col-span-6 row-span-6 h-[856px] bg-zinc-50/10" />
      <Skeleton className="col-span-3 row-span-3 bg-zinc-50/10" />
      <Skeleton className="col-span-3 row-span-3 bg-zinc-50/10" />
    </div>
  )
}
