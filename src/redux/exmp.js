import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.rejected]: handleRejected,
    [fetchContacts.fulfilled](state, { payload }) {
      state.isloading = false;
      state.error = null;
      state.items = payload;
    },
    [addContact.fulfilled](state, { payload }) {
      state.isloading = false;
      state.error = null;
      state.items.push(payload);
    },
    [deleteContact.fulfilled](state, { payload }) {
      state.isloading = false;
      state.error = null;
      const index = state.items.findIndex(contact => contact.id === payload.id);
      state.items.splice(index, 1);
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
