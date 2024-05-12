'use client'

import { productType } from '@/types/product'
// import style from './style.module.css'

// essa interface indica que os parâmetros do componente são do tipo productType
interface ProductProps {
  product: productType
}

// o card recebe um product e mostra as informações dele
export default function Card({ product }: ProductProps) {
  return (
    <div>
      <img src={product.image} alt="Imagem do produto" />
      <div>
        <h2>{product.name}</h2>
        <p>{product.price}</p>
        <p>{product.amount}</p>
        <p>{product.category.name}</p>
        <button>Ver produto</button>
        <button>{product.amount > 0 ? 'Comprar' : 'Esgotado'}</button>
      </div>
    </div>
  )
}
