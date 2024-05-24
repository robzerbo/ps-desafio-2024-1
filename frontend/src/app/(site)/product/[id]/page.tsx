'use client'

import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useEffect, useState } from 'react'
import ThemeContextProvider from '../../theme-context'
import Navbar from '@/components/site/navbar/navbar'
import Footer from '@/components/site/footer/footer'
import CardHorizontal from '@/components/site/cardHorizontal/cardHorizontal'

// pagina criada para mostrar a descrição do produto, além dos outros campos

// os parâmetros são pegos da URL do navegador, vi isso na documentação do react
// tentei fazer da forma do cursinho da udemy, mas nao deu certo

export default function Product({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<productType | null>()

  // pega o id do produto que foi passado ao clicar no "Ver produto" e faz um get da rota de show do product
  const requestProduct = async () => {
    try {
      const response: productType | null = await api.get(
        `/products/${params.id}`,
      )
      setProduct(response)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    requestProduct()
  }, [])

  return (
    <>
      <ThemeContextProvider>
        <Navbar></Navbar>
        <CardHorizontal product={product!} reloadProduct={requestProduct} />
        <Footer />
      </ThemeContextProvider>
    </>
  )
}
