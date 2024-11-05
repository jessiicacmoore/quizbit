import { useState } from 'react';
import styled from 'styled-components';

const StyledList = styled.ul`
  list-style: none;
  padding: 0;  
`;

const StyledButton = styled.button`
  display: inline-block;
  width: 100%;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 2rem;
  cursor: pointer;
  background-color: #f39f5a;
  color: #1d1a39;
`;

function Question({ activeQuestion }) {
  const [userAnswer, setUserAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  const {question, answers } = activeQuestion;

  return ( 
    <>
      <h2>{activeQuestion.question}</h2>
      <StyledList>
        {answers.map((answer) => {
          return (
            <li key={answer.id}>
              <StyledButton>{answer}</StyledButton>
            </li>
          )
        })
        }
      </StyledList>
    </>
   );
}

export default Question;