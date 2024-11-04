import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Quiz from '@/components/Quiz'

import { AVAILABLE_CATEGORIES } from '@/constants/categories.js';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>Quizbit</h1>
        <p>Welcome to Quizbit – the fast-paced trivia app where you pick a category, race against the clock, and see just how sharp your trivia skills are!</p>
      </header>
      <main>
        <Quiz />
      </main>
    </>
  )
}

export default App
