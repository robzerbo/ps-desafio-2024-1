import { useState, createContext, ReactNode } from 'react'

// a constante é exportada para que os componentes filhos possam usar/alterar o tema
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

interface ThemeContextProviderProps {
  children: ReactNode
}

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  // constante responsável por guardar qual o tema atual
  const [theme, setTheme] = useState('light')

  // função para mudar a constante que armazena o tema
  const toggleTheme = () => {
    if (theme === 'light') {
      return setTheme('dark')
    }
    return setTheme('light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
