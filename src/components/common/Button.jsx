import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-block;
  width: 100%;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 2rem;
  cursor: pointer;
  color: #1d1a39;
  background-color: ${({ $btnState }) => $btnState === 'selected' ? '#e8bcb9'
    : $btnState === 'correct' ? '#8dcd8d'
    : $btnState === 'wrong' ? '#eb8c95'
    :'#f39f5a'
  }
`;

function Button({children, btnState = '', ...props}) {
  return ( 
    <StyledButton $btnState={btnState} {...props} >
      {children}
    </StyledButton>
   );
}

export default Button;