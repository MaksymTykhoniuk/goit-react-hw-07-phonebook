import PropTypes from 'prop-types';
import { RxCrossCircled } from 'react-icons/rx';
import { useDeleteContactMutation } from 'redux/contactsSlice';
import { Name, PhoneNumber, Item, Btn } from './ContactItem.styled';

// crateAsyncThunk v.
// import { useDispatch } from 'react-redux';
// import { deleteContact } from 'redux/operations';

export const ContactItem = ({ contact }) => {
  const { id, name, number } = contact;
  const [deleteContact, result] = useDeleteContactMutation();

  // --------- crateAsyncThunk v.
  // const dispatch = useDispatch();
  // const handleDeleteContact = () => dispatch(deleteContact(contact.id));

  return (
    <>
      <Item>
        {!result.isLoading ? (
          <>
            <Name>{name}</Name>
            <PhoneNumber>{number}</PhoneNumber>
          </>
        ) : (
          <p style={{ color: 'grey' }}>Deleting contact...</p>
        )}

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
