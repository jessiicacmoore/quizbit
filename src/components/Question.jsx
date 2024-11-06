import { useState, useEffect, useCallback } from 'react';
import Heading from '@/components/common/Heading';
import Answers from '@/components/Answers';
import TimeoutBar from '@/components/TimeoutBar';

const INITIAL_TIMEOUT = 10000;
const QUICK_TIMEOUT = 1000;
const RESULT_TIMEOUT = 2000;

function Question({ activeQuestion, onSelectAnswer, onSkipAnswer }) {
  const [userAnswer, setUserAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  useEffect(() => {
    setUserAnswer({ selectedAnswer: '', isCorrect: null });
  }, [activeQuestion]);

  const {question, correctAnswer, answers } = activeQuestion;
 
  const timer = userAnswer.selectedAnswer
    ? userAnswer.isCorrect !== null
      ? RESULT_TIMEOUT
      : QUICK_TIMEOUT
    : INITIAL_TIMEOUT;

  const handleSelectAnswer = useCallback(
    (answer) => {
      setUserAnswer({
        selectedAnswer: answer,
        isCorrect: null,
      });

      // Force small delay before showing result
      setTimeout(() => {
        setUserAnswer({
          selectedAnswer: answer,
          isCorrect: correctAnswer === answer,
        });

        // Force another small delay for user to see result before moving to next question
        setTimeout(() => {
          onSelectAnswer(answer);
        }, RESULT_TIMEOUT);
      }, QUICK_TIMEOUT);
    },
    [correctAnswer, onSelectAnswer]
  );

  let answeredState = '';
  if (userAnswer.selectedAnswer && userAnswer.isCorrect !== null) {
    answeredState = userAnswer.isCorrect ? 'correct' : 'wrong';
  } else if (userAnswer.selectedAnswer) {
    answeredState = 'answered';
  }

  return (
    <>
      <TimeoutBar
        key={activeQuestion.id}
        timeout={timer}
        onTimeout={onSkipAnswer}
        mode={answeredState}
      />
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