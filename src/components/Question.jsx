import { useState, useEffect } from 'react';
import Heading from '@/components/common/Heading';
import Answers from '@/components/Answers';

function Question({ activeQuestion, onSelectAnswer }) {
  const [userAnswer, setUserAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  useEffect(() => {
    setUserAnswer({ selectedAnswer: '', isCorrect: null });
  }, [activeQuestion]);

  const {question, correctAnswer, answers } = activeQuestion;

  function handleSelectAnswer (answer) {
    setUserAnswer({
      selectedAnswer: answer,
      isCorrect: null
    });

    // Force small delay before showing result
    setTimeout(() => {
      setUserAnswer({
        selectedAnswer: answer,
        isCorrect: correctAnswer === answer
      });

      // Force another small delay for user to see result before moving to next question
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 1000);
    }, 1000)
  }

  let answeredState = '';

  if (userAnswer.selectedAnswer && userAnswer.isCorrect !== null) {
    answeredState = userAnswer.isCorrect ? 'correct' : 'wrong';
  } else if (userAnswer.selectedAnswer) {
    answeredState = 'answered';
  }

  return (
    <>
      <Heading>{question}</Heading>
      <Answers
        answers={answers}
        answeredState={answeredState}
        userAnswer={userAnswer}
        onSelect={handleSelectAnswer}
      />
    </>
  );
}

export default Question;