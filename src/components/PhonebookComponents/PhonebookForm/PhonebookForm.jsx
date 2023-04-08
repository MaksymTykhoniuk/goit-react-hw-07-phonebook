import { RiUserAddFill } from 'react-icons/ri';
import { useState } from 'react';
import { Notify } from 'notiflix';
import { Form, Btn, Input } from './PhonebookForm.styled';
import { TailSpin } from 'react-loader-spinner';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';

// ----- createAsyncThunk v.
// import { useDispatch, useSelector } from 'react-redux';
// import { addContact } from 'redux/operations';

export const PhonebookForm = () => {
  const { data } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  // ----- createAsyncThunk v.
  // const dispatch = useDispatch();
  // const contacts = useSelector(state => state.contacts.items);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = evt => {
    const { name, value } = evt.currentTarget;

    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleFormSubmit = async evt => {
    evt.preventDefault();

    const contact = {
      name,
      phone: number,
    };

    const alreadyExists = data.findIndex(item => {
      const prevItem = item.name.toLowerCase();
      const newItem = contact.name.toLowerCase();
      return prevItem === newItem;
    });

    if (alreadyExists >= 0) {
      Notify.failure(`${contact.name} is already in contacts`);
      return;
    } else {
      await addContact(contact);
      // dispatch(addContact(contact))
    }

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Input
        type="text"
        name="name"
        value={name}
        placeholder="Enter name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={handleInputChange}
        required
      />
      <Input
        type="tel"
        name="number"
        value={number}
        placeholder="Enter phone number"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        onChange={handleInputChange}
        required
      />
      <Btn type="submit" aria-label="Add contact">
        {isLoading ? (
          <TailSpin
            height="23"
            width="23"
            color="#e0a96d"
            ariaLabel="tail-spin-loading"
            radius="1.1"
            visible={true}
          />
        ) : (
          <RiUserAddFill style={{ marginTop: 2.5 }} size="1.8em" />
        )}
      </Btn>
    </Form>
  );
};
