import { api } from '@/data/api'
import { Product } from '@/data/types/products'

import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

async function getFeatureProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60,
    },
  })

  const products = await response.json()

  return products
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeatureProducts()

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex items-center justify-center"
      >
        <Image
          src={highlightedProduct.image}
          className="group-hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          quality={100}
          alt=""
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap02 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>

          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => {
        return (
          <>
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex items-center justify-center"
            >
              <Image
                src={product.image}
                className="group-hover:scale-105 transition-transform duration-500"
                width={920}
                height={920}
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
  )
}
