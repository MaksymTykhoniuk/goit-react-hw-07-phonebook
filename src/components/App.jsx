import { PhonebookForm } from './PhonebookComponents/PhonebookForm/PhonebookForm';
import { ContactsList } from './PhonebookComponents/ContactsList/ContactsList';
import { Filter } from './PhonebookComponents/Filter/Filter';
import { Section } from './Section/Section';
import { Notification } from './PhonebookComponents/Notification/Notification';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { TailSpin } from 'react-loader-spinner';
// ----- createAsyncThunk v.
// import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const { data, error, isLoading } = useGetContactsQuery();

  // ----- createAsyncThunk v.
  // const dispatch = useDispatch();
  // const contacts = useSelector(state => state.contacts.items);
  // const isLoading = useSelector(state => state.contacts.isLoading);
  // const error = useSelector(state => state.contacts.error);

  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  return (
    <>
      <Section title="Add new contact">
        <PhonebookForm />
      </Section>
      {isLoading && (
        <Section>
          <TailSpin
            height="280"
            width="280"
            color="#e0a96d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            wrapperClass=""
            visible={true}
          />
        </Section>
      )}

      {error && (
        <Section>
          <Notification message="Oops, soomething went wrong"></Notification>
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
