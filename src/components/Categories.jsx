import styled from 'styled-components';
import { AVAILABLE_CATEGORIES } from '@/constants/categories.js';

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

function Categories({ onSelectCategory }) {
  return ( 
    <>
      <h2>Pick a Category:</h2>
      <StyledList>
        {AVAILABLE_CATEGORIES.map((category) => {
          return (
            <li key={category.id}>
              <StyledButton onClick={() => onSelectCategory(category)}>{category.name}</StyledButton>
            </li>
          )
        })
        }
      </StyledList>
    </>
   );
}

export default Categories;