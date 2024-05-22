'use client' // definindo que ele vai ser usado no lado do cliente

// import Card from '@/components/site/cards/cards'
import Navbar, { Filter } from '@/components/site/navbar/navbar'
import Container from '@/components/site/container/container'
import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useEffect, useState } from 'react'
// import style from '@/app/(site)/style.module.css'

import Footer from '@/components/site/footer/footer'
import ThemeContextProvider from './theme-context'
import Card from '@/components/site/cards/cards'

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

  // função que vai mudar os parâmetros do filtro para o valor que eu defini como padrão para não serem considerados
  function filterReset() {
    setFilterName('')
    setFilterCategory('0')
  }

  // essa função tem como objetivo recarregar os produtos da página toda vez que algum for comprado.
  // ela existe pois tive problemas para criar um useState que armazenasse a quantidade e que funcionasse juntamente com o filtro
  // o problema é que toda vez q eu filtrava um produto, ele usava a variavel useState da quantidade de outro produto.
  // este outro produto é o que ficava na posição que o produto filtrado passou a ocupar no momento.
  function reloadData() {
    requestData()
  }

  // função responsável por filtrar os produtos, ela é utilizada no container principal e no slider
  function filterProduct() {
    let cardsFiltred = products

    if (filterCategory === '0' && filterName !== '') {
      cardsFiltred = products?.filter((product) =>
        product.name.toLowerCase().includes(filterName!.toLowerCase()),
      )
    } else if (filterCategory !== '0') {
      cardsFiltred = products?.filter(
        (product) =>
          product.category_id === filterCategory &&
          product.name.toLowerCase().includes(filterName!.toLowerCase()),
      )
    }

    return cardsFiltred
      ?.sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((product: productType, index: number) => (
        <Card product={product} key={index} reloadData={reloadData} />
      ))
  }

  // quando o código rodar, ele vai chamar a função de requisição de produtos
  useEffect(() => {
    requestData()
  }, [])

  return (
    <>
      {/* é passado uma referencia da função para o filho */}
      <ThemeContextProvider>
        <Navbar>
          <Filter
            funcFilterCat={filterByCategory}
            funcFilterName={filterByName}
            funcFilterReset={filterReset}
          />
        </Navbar>
        {/* a explicação da criação do container esta no arquivo do mesmo */}
        <Container>
          {/* 'FilterCards' é uma tag criada para lidar com a parte lógica de filtrar os cards */}
          {/* criei ela para deixar esse arquivo mais simplificado */}
          {filterProduct()}
        </Container>
        <Footer />
      </ThemeContextProvider>
    </>
  )
}
