import { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header from '@/components/Header'
import Quiz from '@/components/Quiz'

import { AVAILABLE_CATEGORIES } from '@/constants/categories.js';

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 1.25rem;
    font-family: "Inter", sans-serif;
    line-height: 1.25;
    color: #e8bcb9;
    text-align: center;
    background: rgb(29,26,57);
    background: linear-gradient(58deg, rgba(29,26,57,1) 0%, rgba(69,25,82,1) 35%, rgba(102,37,73,1) 100%) fixed;
    padding: 2rem 0;
  }
`

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Quiz />
      </main>
    </>
  )
}

export default App
