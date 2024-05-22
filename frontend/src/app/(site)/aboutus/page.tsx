'use client'

import Footer from '@/components/site/footer/footer'
import Navbar from '@/components/site/navbar/navbar'
import ThemeContextProvider from '../theme-context'

import Image from 'next/image'

import style from './style.module.css'
import { useRouter } from 'next/navigation'

export default function Aboutus() {
  const router = useRouter()

  return (
    <>
      <ThemeContextProvider>
        <Navbar />

        <div className={style.warning}>
          <h1 className={style.warning_text}>
            Esta parte do site ainda não foi feita!!!
          </h1>
          <button className={style.button} onClick={() => router.push('/')}>
            VOLTE
          </button>
          <Image
            src={'/vault_boy_dead.png'}
            alt="Aviso de site em desenvolvimento"
            width={400}
            height={200}
          />
        </div>

        <Footer />
      </ThemeContextProvider>
    </>
  )
}
