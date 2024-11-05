import Heading from '@/components/common/Heading';
import List from '@/components/common/List';
import Button from '@/components/common/Button';
import { AVAILABLE_CATEGORIES } from '@/constants/categories.js';

function Categories({ onSelectCategory }) {
  return ( 
    <>
      <Heading>Pick a Category:</Heading>
      <List className="category-list">
        {AVAILABLE_CATEGORIES.map((category) => {
          return (
            <li key={category.id}>
              <Button className='btn category-btn' onClick={() => onSelectCategory(category)}>{category.name}</Button>
            </li>
          )
        })
        }
      </List>
    </>
   );
}

export default Categories;