'use client'
import { useContext } from 'react'
import style from './style.module.css'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { ThemeContext } from '@/app/(site)/theme-context'

export default function Footer() {
  const { theme } = useContext(ThemeContext)

  return (
    <div
      className={`${style.footer} + ${theme === 'light' ? style.footer_light : style.footer_dark}`}
    >
      <div className={style.footer_content}>
        <div
          className={`${style.footer_contacts} + ${theme === 'light' ? style.footer_contacts_light : style.footer_contacts_dark}`}
        >
          <h1>Lojão do 20</h1>
          <p>Tudo com 20% de desconto!</p>
          <p>
            Corra para não perder as ofertas! Chame seus pais, tios(as), avós,
            cachorros, gatos, papagaios e quem puder!!
          </p>
          <div className={style.footer_social_media}>
            <a
              target="_blank"
              href="https://www.instagram.com/"
              className={style.social_media_link}
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              href="https://web.whatsapp.com/"
              className={style.social_media_link}
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
        <div className={style.sponsors}>
          <h1>Patrocinadores</h1>
          <p>Eimazon</p>
          <p>Marcado Ocupado</p>
          <p>Buscacanela</p>
        </div>
      </div>

      <div
        className={`${style.footer_dev} + ${theme === 'light' ? style.footer_dev_light : style.footer_dev_dark}`}
      >
        <h1>@ 2024, feito por Roberto Zerboni Oliari</h1>
      </div>
    </div>
  )
}
