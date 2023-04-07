import { PhonebookForm } from './PhonebookComponents/PhonebookForm/PhonebookForm';
import { ContactsList } from './PhonebookComponents/ContactsList/ContactsList';
import { Filter } from './PhonebookComponents/Filter/Filter';
import { Section } from './Section/Section';
import { Notification } from './PhonebookComponents/Notification/Notification';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { TailSpin } from 'react-loader-spinner';

export const App = () => {
  const { data, error, isLoading } = useGetContactsQuery();

  return (
    <>
      <Section title="Add new contact">
        <PhonebookForm />
      </Section>
      {isLoading && (
        <Section>
          <TailSpin
            height="380"
            width="380"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Section>
      )}

      {error && (
        <Section>
          <p>Oops, soomething went wrong</p>
        </Section>
      )}

      {!isLoading && !error && data.length > 0 && (
        <>
          <Section title="Filter contacts">
            <Filter />
          </Section>

          <Section title="Saved contacts">
            <ContactsList />
          </Section>
        </>
      )}

      {!isLoading && !error && data.length === 0 && (
        <Section>
          <Notification message="There is no contacts in your contact list"></Notification>
        </Section>
      )}
    </>
  );
};
