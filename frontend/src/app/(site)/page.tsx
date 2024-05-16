'use client' // definindo que ele vai ser usado no lado do cliente

// import Card from '@/components/site/cards/cards'
import Navbar from '@/components/site/navbar/navbar'
import Container from '@/components/site/container/container'
import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useEffect, useState } from 'react'
// import style from '@/app/(site)/style.module.css'
import FilterCards from './filterCards'
import Footer from '@/components/site/footer/footer'
import ThemeContextProvider from './theme-context'

export default function Home() {
  // setProducts é a função para pegar jogadores
  const [products, setProducts] = useState<productType[] | null>()
  const [filterCategory, setFilterCategory] = useState<string>('0')
  const [filterName, setFilterName] = useState<string>('')
  // const { theme } = useContext(ThemeContext)

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

  // criei uma função para renderizar os cards, pois na solução com filtro que encontrei (filterCards.tsx),
  // acabo usando o mesmo trecho de código 3 vezes, ai pra simplificar isso, deixei funcional
  // function renderCards(product: productType, index: number) {

  // }

  // quando o código rodar, ele vai chamar a função de requisição de produtos
  useEffect(() => {
    requestData()
  }, [])

  return (
    <>
      {/* é passado uma referencia da função para o filho */}
      <ThemeContextProvider>
        <Navbar
          funcFilterCat={filterByCategory}
          funcFilterName={filterByName}
          funcFilterReset={filterReset}
        />
        {/* a explicação da criação do container esta no arquivo do mesmo */}
        <Container>
          {/* 'FilterCards' é uma tag criada para lidar com a parte lógica de filtrar os cards */}
          {/* criei ela para deixar esse arquivo mais simplificado */}
          <FilterCards
            products={products}
            filterCat={filterCategory}
            filterName={filterName}
            // renderCards={renderCards}
          />
        </Container>
        <Footer />
      </ThemeContextProvider>
    </>
  )
}
