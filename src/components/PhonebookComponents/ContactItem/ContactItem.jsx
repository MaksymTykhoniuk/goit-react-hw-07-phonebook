import PropTypes from 'prop-types';
import { RxCrossCircled } from 'react-icons/rx';
import { useDeleteContactMutation } from '../../../redux/contactsSlice';
import { Name, PhoneNumber, Item, Btn } from './ContactItem.styled';

export const ContactItem = ({ contact }) => {
  const { id, name, number } = contact;
  const [deleteContact, result] = useDeleteContactMutation();

  return (
    <>
      <Item>
        <Name>{name}</Name>
        <PhoneNumber>{number}</PhoneNumber>
        <Btn
          type="button"
          aria-label="Delete contact"
          disabled={result.isLoading}
          onClick={() => deleteContact(id)}
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
