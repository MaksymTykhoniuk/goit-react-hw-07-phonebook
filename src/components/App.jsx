import { PhonebookForm } from './PhonebookComponents/PhonebookForm/PhonebookForm';
import { ContactsList } from './PhonebookComponents/ContactsList/ContactsList';
import { Filter } from './PhonebookComponents/Filter/Filter';
import { Section } from './Section/Section';
import { Notification } from './PhonebookComponents/Notification/Notification';

import { useSelector } from 'react-redux';

export const App = () => {
  const contacts = useSelector(state => state.contacts.value);

  return (
    <>
      <Section title="Add new contact">
        <PhonebookForm />
      </Section>

      <Section title="Filter contacts">
        <Filter />
      </Section>

      <Section title="Saved contacts">
        {contacts.length ? (
          <ContactsList />
        ) : (
          <Notification message="There is no contacts in your contact list"></Notification>
        )}
      </Section>
    </>
  );
};
