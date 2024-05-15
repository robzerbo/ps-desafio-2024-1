'use client'
import style from './style.module.css'
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <div className={style.footer_content}>
      <div className={style.footer_contacts}>
        <h1>Cami</h1>
        <p>Sua melhor</p>
        <div className={style.footer_social_media}>
          <a href="#" className={style.social_media_link}>
            <FaInstagram />
          </a>
          <a href="#" className={style.social_media_link}>
            <FaTwitter />
          </a>
          <a href="#" className={style.social_media_link}>
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  )
}
