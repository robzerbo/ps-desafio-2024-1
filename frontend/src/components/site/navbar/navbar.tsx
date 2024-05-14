'use client'

import { api } from '@/services/api'
import { categoryType } from '@/types/category'

import { useEffect, useState } from 'react'

import style from './style.module.css'

interface FilterProps {
  funcFilterCat?: (name: string) => void | undefined
  funcFilterName?: (value: string) => void | undefined
}

export default function Navbar(props: FilterProps) {
  const [categories, setCategories] = useState<categoryType[] | null>()

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
  })

  return (
    <>
      <div className={style.nav_bar}>
        <div className={style.nav_left}>
          <a href="">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/1024px-LEGO_logo.svg.png"
              alt=""
            />
          </a>
        </div>
        {/* isso é extra */}
        <div className={style.nav_center}>
          <div className={style.nav_filter}>
            <select
              name="category"
              // ou onChange={filter}
              onChange={(evt) => props.funcFilterCat?.(evt.target.value)} // passa a referencia da função de volta para o pai (page)
            >
              <option key={0} value={0}>
                Todas as Categorias
              </option>
              {categories
                ?.sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((category: categoryType, index: number) => (
                  <option key={index + 1} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <input
              id="filterName"
              type="text"
              placeholder="Filtre pelo nome"
              onChange={(evt) => props.funcFilterName?.(evt.target.value)} // passa a referencia da função de volta para o pai (page)
            />
            {/* botao para resetar os filtros */}
            {/* <button onClick={}></button> */}
          </div>
        </div>
        <div className={style.nav_right}>
          <ul className={style.nav_list}>
            {/* <li className={style.nav_list_item}>
              <select
                name="category"
                // ou onChange={filter}
                onChange={(evt) => props.funcFilterCat?.(evt.target.value)}
              >
                <option key={0} value={0}>
                  Todas as Categorias
                </option>
                {categories?.map((category: categoryType, index: number) => (
                  <option key={index + 1} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </li> */}
            <li className={style.nav_list_item}>
              <a href="">Sobre o site</a>
            </li>
            <li className={style.nav_list_item}>
              <a href="">Dark Mode</a>
            </li>
            <li className={style.nav_list_item}>
              <a href="">Sing-in</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
