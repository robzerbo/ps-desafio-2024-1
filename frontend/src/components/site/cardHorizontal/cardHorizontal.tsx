import { productType } from '@/types/product'
import style from './style.module.css'
import Image from 'next/image'
import { useContext } from 'react'
import { ThemeContext } from '@/app/(site)/theme-context'
import { descreaceAmProduct } from '@/actions/product'

// componente criado com o objetivo de mostrar a descrição do produto, além dos demais campos

interface CardHorizontalProps {
  product: productType
  reloadProduct: () => void
}

export default function CardHorizontal({
  product,
  reloadProduct,
}: CardHorizontalProps) {
  const { theme } = useContext(ThemeContext)

  // função reutilizada do cards.tsx
  const sellProduct = async () => {
    try {
      await descreaceAmProduct(product.id)
      reloadProduct()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div
        className={`${style.content} + ${theme === 'light' ? style.content_light : style.content_dark}`}
      >
        <div
          className={`${style.product} + ${theme === 'light' ? style.product_light : style.product_dark}`}
        >
          <div className={style.image}>
            <Image
              src={product?.image}
              alt="Logo do site"
              width={200}
              height={200}
              priority={true}
            />
          </div>
          <div className={style.body}>
            <h1 className={style.name}>{product?.name}</h1>
            <p className={style.category_name}>
              Categoria: {product?.category.name}
            </p>
            {/* campo reutilizado de cards.tsx (card_price) */}
            <p className={style.card_price}>
              <span className={style.card_price_discount}>
                De <s>R$ {product?.price + product?.price * 0.25}</s>
              </span>
              Por R$ {product?.price}
              <span
                className={`${style.card_price_discount} + ${style.card_price_discount_color}`}
              >
                (
                {(
                  100 -
                  (product?.price * 100) /
                    (product?.price + product?.price * 0.25)
                ).toFixed(0)}
                % de desconto!)
              </span>
            </p>
            <p className={style.amount}>
              Quantidade em estoque: {product?.amount} unidade(s)
            </p>
            {/* campo reutilizado de cards.tsx (card_buyProduct) */}
            <div
              className={`${style.card_buyProduct} + ${theme === 'light' ? style.card_buyProduct_light : style.card_buyProduct_dark}`}
            >
              {product?.amount > 0 ? (
                <button onClick={sellProduct}>Comprar</button>
              ) : (
                <p>Esgotado</p>
              )}
            </div>
          </div>
          <p className={style.description}>{product?.description}</p>
        </div>
      </div>
    </>
  )
}
