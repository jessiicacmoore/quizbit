import { useState } from 'react';
import { decode } from 'html-entities';

import styled from 'styled-components';
import Categories from '@/components/Categories';
import Question from '@/components/Question';

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
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const activeQuestionIndex = userAnswers.length;
  
  async function handleSelectCategory (category) {
    let decodedQuestions;

    setSelectedCategory(category);
    setIsFetching(true);

    const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${category.id}&difficulty=easy&type=multiple`);
    const resData = await res.json();

    decodedQuestions = resData.results.map((question, index) => {
      let decodedIncorrectAnswers = question.incorrect_answers.map((encodedAnswer) => decode(encodedAnswer));
    
      return {
        id: index,
        question: decode(question.question),
        answers: [decode(question.correct_answer), ...decodedIncorrectAnswers]
      }
    });

    setQuestions(decodedQuestions);
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
        : <Question activeQuestion={questions[activeQuestionIndex]} />
      }
    </StyledQuiz>
  );
}

export default Quiz ;