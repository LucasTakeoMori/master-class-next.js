import { AddToCartButton } from '@/components/add-to-cart-button'
import { api } from '@/data/api'
import type { Product } from '@/data/types/products'
import type { Metadata } from 'next'
import Image from 'next/image'

interface ProductProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  })

  const products = await response.json()

  return products
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: product.title,
  }
}

// Generate static build
export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  // return [{ slug: 'moletom-never-stop-learning' }]

  return products.map((product) => {
    return { slug: product.slug }
  })
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.slug)

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hdiden">
        <Image
          src={product.image}
          alt="moletom never stop learning"
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2 font-semibold">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>

          <span className="text-sm text-zinc font-bold ">
            Em até 12x s/ juros de{' '}
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}{' '}
            sem juros
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-violet-500">
              P
            </button>

            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-violet-500">
              M
            </button>

            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-violet-500">
              G
            </button>

            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-violet-500">
              GG
            </button>
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
