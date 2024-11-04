import styled from 'styled-components';

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
  return (
    <StyledQuiz>
      <h2>Quiz goes here</h2>
    </StyledQuiz>
  );
}

export default Quiz ;