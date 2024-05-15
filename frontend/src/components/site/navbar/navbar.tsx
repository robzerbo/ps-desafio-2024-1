'use client'

import { api } from '@/services/api'
import { categoryType } from '@/types/category'

import { useEffect, useRef, useState } from 'react'

import style from './style.module.css'
import { getSession } from 'next-auth/react'

interface FilterProps {
  funcFilterCat?: (name: string) => void | undefined
  funcFilterName?: (value: string) => void | undefined
  funcFilterReset?: () => void | undefined
}

export default function Navbar(props: FilterProps) {
  const [isAuth, setIsAuth] = useState<boolean>()
  const [categories, setCategories] = useState<categoryType[] | null>()
  const inputNameRef = useRef<HTMLInputElement>(null)
  const inputCatRef = useRef<HTMLSelectElement>(null)

  const requestSession = async () => {
    try {
      const sessionResponse = await getSession()
      setIsAuth(!!sessionResponse?.user)
    } catch (error) {
      console.log(error)
    }
  }

  const requestCategories = async () => {
    try {
      const response: categoryType[] | null = await api.get('/categories')
      setCategories(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    requestSession()
    requestCategories()
  }, [])

  function reset() {
    props.funcFilterReset!()
    inputNameRef.current!.value = ''
    inputCatRef.current!.value = '0'
  }

  return (
    <>
      <div className={style.nav_bar}>
        <div className={style.nav_left}>
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/1024px-LEGO_logo.svg.png"
              alt=""
            />
          </a>
        </div>
        {/* isso é extra */}
        <div className={style.nav_center}>
          {/* <div className={style.nav_filter}> */}
          <select
            className={style.select}
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
            className={style.input}
            ref={inputNameRef}
            id="filterName"
            type="text"
            placeholder="Filtre pelo nome"
            onChange={(evt) => props.funcFilterName?.(evt.target.value)} // passa a referencia da função de volta para o pai (page)
          />
          {/* botao para resetar os filtros */}
          <button id="resetFilter" className={style.button} onClick={reset}>
            Limpar
          </button>
          {/* </div> */}
        </div>
        <div className={style.nav_right}>
          <ul className={style.nav_list}>
            <li className={style.nav_list_item}>
              <a href="#">Sobre o site</a>
            </li>
            <li className={style.nav_list_item}>
              <a href="#">Dark Mode</a>
            </li>
            <li className={style.nav_list_item}>
              <a href="/admin">{isAuth ? 'Logado' : 'Sign-in'}</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
