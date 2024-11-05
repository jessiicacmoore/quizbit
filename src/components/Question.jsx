import { useState, useEffect } from 'react';
import Heading from '@/components/common/Heading';
import Answers from '@/components/Answers';
import TimeoutBar from '@/components/TimeoutBar';

function Question({ activeQuestion, onSelectAnswer, onSkipAnswer }) {
  const [userAnswer, setUserAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  useEffect(() => {
    setUserAnswer({ selectedAnswer: '', isCorrect: null });
  }, [activeQuestion]);

  const {question, correctAnswer, answers } = activeQuestion;
  let timer = 10000;

  if (userAnswer.selectedAnswer) {
    timer = 1000;
  }

  if (userAnswer.isCorrect !== null) {
    timer = 2000;
  }

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
      }, 2000);
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
      <TimeoutBar key={activeQuestion.id} timeout={timer} onTimeout={onSkipAnswer} mode={answeredState} />
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