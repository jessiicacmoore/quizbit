import { useState } from 'react';
import styled from 'styled-components';

import Categories from '@/components/Categories';
import Question from '@/components/Question';
import Summary from './Summary';
import { useQuestions } from '@/hooks/useQuestions';

const StyledQuiz = styled.div`
  background-color: #1d1a39;
  width: clamp(5rem, 80%, 40rem);
  padding: 2rem;
  margin: 0 auto;
  border-radius: 2rem;
  box-shadow: 10px 10px 26px -3px rgba(0,0,0,0.49);
`
function Quiz () {
  const { questions, isFetching, loadQuestions } = useQuestions();
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [userAnswers, setUserAnswers] = useState([]);

  let quizStatus;
  if (isFetching) {
    quizStatus = 'loading';
  } else if (!selectedCategory) {
    quizStatus = 'selectCategory';
  } else if (userAnswers.length < questions.length) {
    quizStatus = 'showQuestion';
  } else {
    quizStatus = 'showSummary';
  }
  
  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }

  const handleSelectCategory = (id) => {
    console.log(id)
    setSelectedCategory(id);
    loadQuestions(id);
  }

  const handleSkipAnswer = () => {
    setUserAnswers((prevAnswers) => [...prevAnswers, null]);
  };

  const handleReset = () => {
    setSelectedCategory(undefined);
    setUserAnswers([]);
  }

  return (
    <StyledQuiz>
      {isFetching && <p>Loading questions...</p>}

      {quizStatus === 'selectCategory' && !isFetching && (
        <Categories onSelectCategory={handleSelectCategory} />
      )}

      {quizStatus === 'showQuestion' && (
        <Question
          activeQuestion={questions[userAnswers.length]}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
      )}

      {quizStatus === 'showSummary' && (
        <Summary questions={questions} userAnswers={userAnswers} onReset={handleReset}/>
      )}
    </StyledQuiz>
  );
}

export default Quiz ;