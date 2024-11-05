import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;  
`;

function List({ children, ...props }) {
  return ( 
    <StyledList {...props} >
      {children}
    </StyledList>
   );
}

export default List;