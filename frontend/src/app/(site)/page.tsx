'use client' // definindo que ele vai ser usado no lado do cliente

import Card from '@/components/site/cards/cards'
import Navbar from '@/components/site/navbar/navbar'
import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useEffect, useState } from 'react'
import style from '@/app/(site)/style.module.css'
import FilterCards from './filterCards'

export default function Home() {
  // setProducts é a função para pegar jogadores
  const [products, setProducts] = useState<productType[] | null>()
  const [filterCategory, setFilterCategory] = useState<string>('0')
  const [filterName, setFilterName] = useState<string>('')

  const requestData = async () => {
    try {
      // faz a requisição a api pelos dados
      const response: productType[] | null = await api.get('/products')
      // atribui a resposta da api a const products
      setProducts(response)
    } catch (e) {}
  }

  // função de filtro pelo nome criada no componente pai (page).
  // uma referência dela é enviada para o filho (navbar) e quando o input de nome mudar
  // o filho vai enviar as alterações para o pai e ele vai usar o resultado para filtrara de acordo
  function filterByName(name: string) {
    setFilterName(name)
  }

  // função que o filho vai usar para enviar o id para o pai, para realizar o filtro por categoria
  function filterByCategory(value: string) {
    setFilterCategory(value)
  }

  function renderCards(product: productType, index: number) {
    return <Card product={product} key={index} />
  }

  // quando o código rodar, ele vai chamar a função de requisição de produtos
  useEffect(() => {
    requestData()
  })

  return (
    <>
      {/* é passado uma referencia da função para o filho */}
      <Navbar funcFilterCat={filterByCategory} funcFilterName={filterByName} />
      <div className={style.content}>
        <div className={style.centralize}>
          {/* {products?.map((product: productType, index: number) => (
            <Cardproduct={product} key={index} />
          ))} */}
        </div>
        {/* 'FilterCards' é uma tag criada para lidar com a parte lógica de filtrar os cards */}
        {/* criei ela para deixar esse arquivo mais simplificado */}
        <FilterCards
          products={products}
          filterCat={filterCategory}
          filterName={filterName}
          renderCards={renderCards}
        />
      </div>
    </>
  )
}
