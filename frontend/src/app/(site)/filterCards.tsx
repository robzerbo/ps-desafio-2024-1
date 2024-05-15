'use client'

import { productType } from '@/types/product'

interface FilterCardsProps {
  products?: productType[] | null
  filterCat?: string
  filterName?: string
  renderCards?: (product: productType, index: number) => void
}

export default function FilterCards(props: FilterCardsProps) {
  return (
    <>
      {/* Essa primeira condição indica que os filtros não foram usados */}
      {props.filterName === '' && props.filterCat === '0'
        ? props.products
            ?.sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((product: productType, index: number) =>
              props.renderCards?.(product, index),
            )
        : props.filterCat === '0' // essa indica que o da categoria não foi usado, mas o do nome sim
          ? props.products
              ?.filter((product) =>
                product.name
                  .toLowerCase()
                  .includes(props.filterName!.toLowerCase()),
              )
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((product: productType, index: number) =>
                props.renderCards?.(product, index),
              )
          : props.products // essa ultima indica que os dois filtros foram usados, ou apenas o de categoria
              ?.filter(
                (product) =>
                  product.category_id === props.filterCat &&
                  product.name
                    .toLowerCase()
                    .includes(props.filterName!.toLowerCase()),
              )
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((product: productType, index: number) =>
                props.renderCards?.(product, index),
              )}
    </>
  )
}
