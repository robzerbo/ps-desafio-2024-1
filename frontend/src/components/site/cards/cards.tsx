'use client'

import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useState } from 'react'
import style from './style.module.css'

// essa interface indica que os parâmetros do componente são do tipo productType
interface ProductProps {
  product: productType
}

// o card recebe um product e mostra as informações dele
export default function Card({ product }: ProductProps) {
  const [amountProduct, setAmountProduct] = useState<number>(product.amount)

  const sellProduct = async () => {
    try {
      await api.post(`/products/${product.id}`)
      setAmountProduct(product.amount - 1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={style.card_container}>
      <img
        className={style.card_img}
        src={product.image}
        alt="Imagem do produto"
      />
      <div className={style.card_content}>
        <h2 className={style.card_name}>{product.name}</h2>
        <p className={style.card_price}>R$ {product.price}</p>
        <p className={style.card_amount}>
          Quantidade disponível: {amountProduct}
        </p>
        <p className={style.card_categoryName}>
          Categoria: {product.category.name}
        </p>
        {/* <button>Ver produto</button> */}
        <div className={style.card_burProduct}>
          {amountProduct > 0 ? (
            <button onClick={sellProduct}>Comprar</button>
          ) : (
            <p>Esgotado</p>
          )}
        </div>
      </div>
    </div>
  )
}
