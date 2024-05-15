'use client'
import { useContext } from 'react'
import style from './style.module.css'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { ThemeContext } from '@/app/(site)/theme-context'

export default function Footer() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={style.footer_content}>
      <div
        className={`${style.footer_contacts} + ${theme === 'light' ? style.footer_light : style.footer_dark}`}
      >
        <h1>Zerboni Kids</h1>
        <p>A melhor loja de roupas e acessórios do bebê ao infanto-juvenil.</p>
        <div className={style.footer_social_media}>
          <a
            target="_blank"
            href="https://www.instagram.com/zerbonikids/"
            className={style.social_media_link}
          >
            <FaInstagram />
          </a>
          <a
            target="_blank"
            href="https://l.instagram.com/?u=http%3A%2F%2Fwa.me%2F5527997896835&e=AT0KL04oQEyHimVsWDezlw2X5pNIpgOKZkH_KOzh0Eyt7qbdv6aQAzuPcouqbnS9fXY2I7JbqT8DDS4WZ66uwWUM6DZStBBTYgW0qd178NAOuOKakFR0Ow"
            className={style.social_media_link}
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
      <div
        className={`${style.footer_dev} + ${theme === 'light' ? style.footer_light : style.footer_dark}`}
      >
        <h1>@ 2024, feito por Roberto Zerboni Oliari</h1>
      </div>
    </div>
  )
}
