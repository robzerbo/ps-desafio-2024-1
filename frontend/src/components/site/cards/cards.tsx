'use client'

import { productType } from '@/types/product'
import style from './style.module.css'
import Image from 'next/image'
import { descreaceAmProduct } from '@/actions/product'
import { useContext } from 'react'
import { ThemeContext } from '@/app/(site)/theme-context'
import { useRouter } from 'next/navigation'

// essa interface indica que os parâmetros do componente são do tipo productType
interface ProductProps {
  product: productType
  reloadData: () => void
}

// o card recebe um product e mostra as informações dele
export default function Card({ product, reloadData }: ProductProps) {
  const { theme } = useContext(ThemeContext)
  const router = useRouter()

  const sellProduct = async () => {
    try {
      await descreaceAmProduct(product.id)
      reloadData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`${style.card} + ${theme === 'light' ? style.card_light : style.card_dark}`}
    >
      <Image
        className={style.card_img}
        src={product.image}
        alt="Imagem do produto"
        width={100}
        height={100}
      />
      <div className={style.card_body}>
        <div className={style.card_text}>
          <h2 className={style.card_name}>{product.name}</h2>

          <p className={style.card_price}>
            <span className={style.card_price_discount}>
              De <s>R$ {product.price + product.price * 0.25}</s>
            </span>
            Por R$ {product.price}
            <span
              className={`${style.card_price_discount} + ${style.card_price_discount_color}`}
            >
              (
              {(
                100 -
                (product.price * 100) / (product.price + product.price * 0.25)
              ).toFixed(0)}
              % de desconto!)
            </span>
          </p>
          <p className={style.card_amount}>Estoque: {product.amount} un</p>
          <p className={style.card_categoryName}>
            Categoria: {product.category.name}
          </p>
        </div>

        <button onClick={() => router.push(`/product/${product.id}`)}>
          Ver produto
        </button>
        <div className={style.card_buyProduct}>
          {product.amount > 0 ? (
            <button onClick={sellProduct}>Comprar</button>
          ) : (
            <p>Esgotado</p>
          )}
        </div>
      </div>
    </div>
  )
}
