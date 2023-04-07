import { RiUserAddFill } from 'react-icons/ri';
import { useState } from 'react';
import { Notify } from 'notiflix';
import { Form, Btn, Input } from './PhonebookForm.styled';

import {
  useAddContactMutation,
  useGetContactsQuery,
} from '../../../redux/contactsSlice';

export const PhonebookForm = () => {
  const { data } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

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
        <RiUserAddFill size="1.8em" />
      </Btn>
    </Form>
  );
};
