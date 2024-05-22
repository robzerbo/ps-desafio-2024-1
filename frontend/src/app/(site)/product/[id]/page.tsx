'use client'

import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useEffect, useState } from 'react'
import ThemeContextProvider from '../../theme-context'
import Navbar from '@/components/site/navbar/navbar'
import Footer from '@/components/site/footer/footer'

export default function Product({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<productType | null>()

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

        <Footer />
      </ThemeContextProvider>
    </>
  )
}
