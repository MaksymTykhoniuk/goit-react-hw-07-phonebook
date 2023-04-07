import PropTypes from 'prop-types';
import { RxCrossCircled } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../../redux/contactsSlice';
import { Name, PhoneNumber, Item, Btn } from './ContactItem.styled';

export const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const { id, name, number } = contact;
  return (
    <>
      <Item>
        <Name>{name}</Name>
        <PhoneNumber>{number}</PhoneNumber>
        <Btn
          type="button"
          aria-label="Delete contact"
          onClick={() => dispatch(deleteContact(id))}
        >
          <RxCrossCircled size="2em" />
        </Btn>
      </Item>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
