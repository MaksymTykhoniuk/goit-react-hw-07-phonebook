import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../redux/filterSlice';
import { FilterInput, FilterWrapper, Btn } from './Filter.styled';

export const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    const { value } = event.currentTarget;
    dispatch(setFilter(value));
  };

  const clearFilterField = () => {
    dispatch(setFilter(''));
  };

  return (
    <>
      <FilterWrapper>
        <label htmlFor="filter">
          <FilterInput
            type="text"
            id="filter"
            name="filter"
            value={filter}
            onChange={handleFilterChange}
          />
        </label>
        <Btn type="button" aria-label="Clear filter" onClick={clearFilterField}>
          <AiFillDelete size="1.8em" />
        </Btn>
      </FilterWrapper>
    </>
  );
};
