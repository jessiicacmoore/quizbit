import { useState, useCallback } from 'react';
import { decode } from 'html-entities';

import styled from 'styled-components';
import Categories from '@/components/Categories';
import Question from '@/components/Question';
import Summary from './Summary';

const StyledQuiz = styled.div`
  background-color: #1d1a39;
  width: clamp(5rem, 80%, 40rem);
  padding: 2rem;
  margin: 0 auto;
  border-radius: 2rem;
  box-shadow: 10px 10px 26px -3px rgba(0,0,0,0.49);
`
async function fetchQuestions (categoryId) {
  const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=multiple`);
  const resData = await res.json();

  return resData.results;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function Quiz () {
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === questions.length;
  
  async function handleSelectCategory (category) {
    setSelectedCategory(category);
    setIsFetching(true);

    const fetchedQuestions = await fetchQuestions(category.id);

    const decodedQuestions = fetchedQuestions.map((question, index) => {
      const decodedIncorrectAnswers = question.incorrect_answers.map(decode);
      const answers = shuffleArray([decode(question.correct_answer), ...decodedIncorrectAnswers]);
    
      return {
        id: index,
        question: decode(question.question),
        correctAnswer: decode(question.correct_answer),
        answers
      }
    });

    setQuestions(decodedQuestions);
    setIsFetching(false);
  }

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null)
  }, [handleSelectAnswer]);

  function handleReset() {
    setSelectedCategory(undefined);
    setUserAnswers([]);
    setQuestions([]);
  }

  if (!selectedCategory) {
    return (
      <StyledQuiz>
        <Categories onSelectCategory={handleSelectCategory} />
      </StyledQuiz>
    )
  }

  if (quizIsComplete) {
    return (
      <StyledQuiz>
        <Summary userAnswers={userAnswers} questions={questions} onReset={handleReset}/>
      </StyledQuiz>
    )
  }

  return (
    <StyledQuiz>
      {isFetching
        ? <h2>Loading questions from {selectedCategory.name}</h2>
        : <Question activeQuestion={questions[activeQuestionIndex]} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer} />
      }
    </StyledQuiz>
  );
}

export default Quiz ;