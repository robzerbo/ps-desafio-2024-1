import { ThemeContext } from '@/app/(site)/theme-context'
import { ComponentProps, useContext } from 'react'
import style from './style.module.css'

// criei esse arquivo para que o darkmode funcionasse no plano de fundo do site todo
// antes, eu estava tentando chamar o context la no arquivo page.tsx, porém ele estava num nivel acima em relação
// ao ThemeContextProvider e, depois de muita luta, olhei na documentação do react e vi que o
// ThemeContextProvider tem que estar acima dos contextos que ele vai alterar, ou seja, este arquivo
// deixa o contexto abaixo dele para que possa ser usado

export default function Container({ children }: ComponentProps<'div'>) {
  const { theme } = useContext(ThemeContext)

  return (
    <div
      className={`${style.productspage} + ${theme === 'light' ? style.productspage_light : style.productspage_dark}`}
    >
      <div className={style.wrapper}>{children}</div>
    </div>
  )
}
