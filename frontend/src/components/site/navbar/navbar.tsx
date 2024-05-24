'use client'

import { api } from '@/services/api'
import { categoryType } from '@/types/category'

import Image from 'next/image'
import { ComponentProps, useContext, useEffect, useRef, useState } from 'react'

import { PiEraserFill } from 'react-icons/pi'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { RiLoginCircleLine } from 'react-icons/ri'

import style from './style.module.css'
import { getSession } from 'next-auth/react'
import { ThemeContext } from '@/app/(site)/theme-context'

interface FilterProps {
  funcFilterCat?: (name: string) => void | undefined
  funcFilterName?: (value: string) => void | undefined
  funcFilterReset?: () => void | undefined
}

export function Filter(props: FilterProps) {
  const [categories, setCategories] = useState<categoryType[] | null>()
  const inputNameRef = useRef<HTMLInputElement>(null)
  const inputCatRef = useRef<HTMLSelectElement>(null)
  const { theme } = useContext(ThemeContext)

  const requestCategories = async () => {
    try {
      const response: categoryType[] | null = await api.get('/categories')
      setCategories(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    requestCategories()
  }, [])

  // olhando bem, eu uso duas funções de reset no filtro, uma para mudar a const useState e outra para mudar o elemento HTML diretamente.
  // ambas funcionam de forma sincronizada
  function reset() {
    props.funcFilterReset!()
    inputNameRef.current!.value = ''
    inputCatRef.current!.value = '0'
  }

  return (
    <>
      <div className={style.nav_center}>
        <select
          className={`${style.select} + ${theme === 'light' ? style.nav_center_itens_light : style.nav_center_itens_dark}`}
          ref={inputCatRef}
          id="category"
          name="category"
          onChange={(evt) => props.funcFilterCat?.(evt.target.value)} // passa a referencia da função de volta para o pai (page)
        >
          <option className={style.select_option} key={0} value={0}>
            Todas as Categorias
          </option>
          {categories
            ?.sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((category: categoryType, index: number) => (
              <option
                className={style.select_option}
                key={index + 1}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
        </select>
        <input
          className={`${style.input} + ${theme === 'light' ? style.nav_center_itens_light : style.nav_center_itens_dark}`}
          ref={inputNameRef}
          id="filterName"
          type="text"
          placeholder="Filtre pelo nome"
          onChange={(evt) => props.funcFilterName?.(evt.target.value)} // passa a referencia da função de volta para o pai (page)
        />
        <button
          id="resetFilter"
          className={`${style.button} + ${theme === 'light' ? style.nav_center_itens_light : style.nav_center_itens_dark}`}
          onClick={reset}
        >
          <PiEraserFill />
        </button>
      </div>
    </>
  )
}

export default function Navbar({ children }: ComponentProps<'div'>) {
  const [isAuth, setIsAuth] = useState<boolean>()
  const { theme, toggleTheme } = useContext(ThemeContext)

  const requestSession = async () => {
    try {
      const sessionResponse = await getSession()
      setIsAuth(!!sessionResponse?.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    requestSession()
  }, [])

  return (
    <>
      <div
        className={`${style.nav_bar} +
        ${theme === 'light' ? style.nav_bar_light : style.nav_bar_dark}`}
      >
        <div className={style.nav_left}>
          <a href="/">
            <Image
              src={`${theme === 'light' ? '/logo_light.png' : '/logo_dark.png'}`}
              alt="Logo do site"
              width={200}
              height={70}
              priority={true}
            />
          </a>
        </div>
        {children}
        <div
          className={`${style.nav_right} + ${theme === 'light' ? style.nav_right_light : style.nav_right_dark}`}
        >
          <ul className={style.nav_list}>
            <li className={style.tooltip}>
              <a
                href="/aboutus"
                className={`${style.nav_list_item} + ${theme === 'light' ? style.nav_list_item_light : style.nav_list_item_dark}`}
              >
                <IoInformationCircleOutline />
              </a>
              <span
                className={`${style.tooltip_text} + ${theme === 'light' ? style.tooltip_text_light : style.tooltip_text_dark}`}
              >
                O site ainda está em desenvolvimento, por favor, espere versões
                mais estáveis
              </span>
            </li>

            <li>
              <button
                className={`${style.nav_list_item} + ${theme === 'light' ? style.nav_list_item_light : style.nav_list_item_dark}`}
                onClick={() => toggleTheme()}
              >
                {theme === 'light' ? (
                  <MdOutlineDarkMode />
                ) : (
                  <MdOutlineLightMode />
                )}
              </button>
            </li>
            <li>
              <a
                href="/admin"
                className={`${style.nav_list_item} + ${theme === 'light' ? style.nav_list_item_light : style.nav_list_item_dark}`}
              >
                {isAuth ? <CgProfile /> : <RiLoginCircleLine />}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
