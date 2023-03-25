import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'components/shared/api/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, thunkAPI) => {
    try {
      const data = await api.getContacts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addContact(data);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      if (isDublicate(data, contacts.items)) {
        alert(`${data.name} is already in your PhoneBook!`);
        return false;
      }
    },
  }
);

export const removeContact = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const fetchContacts = () => {
//   const func = async dispatch => {
//     try {
//       dispatch(actions.fetchContactsLoading());
//       const data = await api.getContacts();
//       dispatch(actions.fetchContactsSuccess(data));
//     } catch (error) {
//       dispatch(actions.fetchContactsError(error.message));
//     }
//   };
//   return func;
// };

const isDublicate = ({ name, phone }, contacts) => {
  const normalizedName = name.toLowerCase();
  const result = contacts.find(item => {
    return normalizedName === item.name.toLowerCase();
  });
  return Boolean(result);
};

// export const addContact = data => {
//   const func = async (dispatch, getState) => {
//     const { contacts } = getState();
//     if (isDublicate(data, contacts.items)) {
//       alert(`${data.name} is already in your PhoneBook!`);
//     }
//     try {
//       dispatch(actions.addContactLoading);
//       const result = await api.addContact(data);
//       dispatch(actions.addContactSuccess(result));
//     } catch (error) {
//       dispatch(actions.addContactError(error.message));
//     }
//   };
//   return func;
// };

// export const removeContact = id => {
//   const func = async dispatch => {
//     try {
//       dispatch(actions.deleteContactLoading);
//       await api.deleteContact(id);
//       dispatch(actions.deleteContactSuccess(id));
//     } catch (error) {
//       dispatch(actions.deleteContactError(error.message));
//     }
//   };
//   return func;
// };
