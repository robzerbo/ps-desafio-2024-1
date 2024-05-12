'use client' // definindo que ele vai ser usado no lado do cliente

import Card from '@/components/site/cards/cards'
import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useEffect, useState } from 'react'

export default function Home() {
  // setProducts é a função para pegar jogadores
  const [products, setProducts] = useState<productType[] | null>()

  const requestData = async () => {
    try {
      // faz a requisição a api pelos dados
      const response: productType[] | null = await api.get('/products')
      // atribui a resposta da api a const products
      setProducts(response)
    } catch (e) {}
  }

  // quando o código rodar, ele vai chamar a função de requisição de produtos
  useEffect(() => {
    requestData()
  })

  return (
    <>
      <div>
        {products?.map((product: productType, index: number) => (
          <Card product={product} key={index} />
        ))}
      </div>
    </>
  )
}
