import { ContactItem } from 'components/PhonebookComponents/ContactItem/ContactItem';
import { List } from './ContactsList.styled';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from '../../../redux/contactsSlice';

export const ContactsList = () => {
  const { data } = useGetContactsQuery();
  const filter = useSelector(state => state.filter);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return data.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <List>
      {filteredContacts.map(contact => {
        return <ContactItem key={contact.id} contact={contact}></ContactItem>;
      })}
    </List>
  );
};
