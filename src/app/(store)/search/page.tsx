import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { api } from '@/data/api'
import type { Product } from '@/data/types/products'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60,
    },
  })

  const products = await response.json()

  return products
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  console.log('Busca no input de form: ', query)

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <>
              <Link
                href={`/product/${product.slug}`}
                className="group relative rounded-lg bg-zinc-900 overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={product.image}
                  className="group-hover:scale-105 transition-transform duration-500"
                  width={480}
                  height={480}
                  quality={100}
                  alt=""
                />

                <div className="absolute bottom-10 right-28 h-12 flex items-center gap02 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                  <span className="text-sm truncate">{product.title}</span>

                  <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </Link>
            </>
          )
        })}
      </div>
    </div>
  )
}
