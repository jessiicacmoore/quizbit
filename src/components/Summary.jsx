import styled from "styled-components";
import Heading from "@/components/common/Heading";
import List from "@/components/common/List";
import Button from "@/components/common/Button";

const StyledAnswer = styled.li`
  background: rgba(232, 188, 185, 0.1);
  padding: 1rem 2rem;
  box-shadow: 10px 10px 26px -3px rgba(0,0,0,0.49);
  border-radius: 1rem;
  font-size: 1rem;
  margin-bottom: 3rem;
  & h3 {
    font-size: 1.25rem;
  }
  ${({ $mode }) => {
    const resultColor = $mode === 'correct' ? '#8dcd8d' : '#dc3545'; 

    if ($mode !== 'skipped') {
      return `
        & .result {
          color: ${resultColor};
        }
      `;
    }
  }}
`

function Summary({ userAnswers, questions, onReset }) {
  return ( 
    <>
      <Heading>Quiz Complete!</Heading>
      <List>
        {userAnswers.map((answer, index) => {
          const answerState =
            answer === null
              ? 'skipped'
              : answer === questions[index].correctAnswer
              ? 'correct'
              : 'wrong';

            return (
              <StyledAnswer key={index} $mode={answerState} >
                <h3>{questions[index].question}</h3>
                {answer && (
                  <>
                    <p>
                      <b>Your answer:</b> {answer}
                    </p>
                    <p className="result">
                      <b>This is {answerState}!</b>
                    </p>
                  </>
                )}
                {!answer && (
                  <>
                    <p>You ran out of time.</p>
                    <p className="result"><b>The question was skipped!</b></p>
                  </>
                )}
              </StyledAnswer>
            );
        })}
      </List>
      <Button onClick={onReset}>I want to play again!</Button>
    </>
   );
}

export default Summary;