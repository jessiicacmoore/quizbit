import { useState } from 'react';

import styled from 'styled-components';
import Categories from '@/components/Categories';

const StyledQuiz = styled.div`
  background-color: #1d1a39;
  width: clamp(5rem, 80%, 40rem);
  padding: 2rem;
  margin: 0 auto;
  border-radius: 2rem;
  -webkit-box-shadow: 10px 10px 26px -3px rgba(0,0,0,0.49);
  -moz-box-shadow: 10px 10px 26px -3px rgba(0,0,0,0.49);
  box-shadow: 10px 10px 26px -3px rgba(0,0,0,0.49);
`

function Quiz () {
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [questions, setQuestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  
  async function handleSelectCategory (category) {
    setSelectedCategory(category);
    setIsFetching(true);

    const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${category.id}&difficulty=easy&type=multiple`);
    const resData = await res.json();

    setQuestions(resData.results);
    setIsFetching(false);
  }

  if (!selectedCategory) {
    return (
      <StyledQuiz>
        <Categories onSelectCategory={handleSelectCategory} />
      </StyledQuiz>
    )
  }

  return (
    <StyledQuiz>
      {isFetching
        ? <h2>Loading questions from {selectedCategory.name}</h2>
        : <h2>Questions: {questions.map((question, index) => <p key={index}>{question.question}</p>)}</h2>
      }
    </StyledQuiz>
  );
}

export default Quiz ;