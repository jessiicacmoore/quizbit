import styled from 'styled-components';

const StyledHeader = styled.header`
  margin-bottom: 2rem;

  & .logo {
    font-size: 6rem;
  }

  & p {
    width: clamp(5rem, 80%, 45rem);
    margin: 0 auto;
  }
`

function Header() {
  return ( 
    <StyledHeader>
        <span className="logo" aria-hidden="true">⚡️</span>
        <h1>Quizbit</h1>
        <p>Welcome to Quizbit – the fast-paced trivia app where you pick a category, race against the clock, and see just how sharp your trivia skills are!</p>
    </StyledHeader>
   );
}

export default Header;