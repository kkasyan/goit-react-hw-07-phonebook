import css from './app.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter/slice';
import { getFilteredContacts } from 'redux/contacts/selectors';
import { getFilter } from 'redux/filter/selectors';
import {
  fetchContacts,
  addContact,
  removeContact,
} from 'redux/contacts/operations';

import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const contacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onAddContact = payload => {
    dispatch(addContact(payload));
  };

  const onRemoveContact = id => {
    dispatch(removeContact(id));
  };

  const onSetFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  return (
    <div className={css.wrap}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />
      <section className={css.list}>
        <h2 className={css.contactsHeader}>Contacts</h2>
        <Filter onChange={onSetFilter} value={filter} />
        {contacts.length > 0 ? (
          <ContactList items={contacts} removeContact={onRemoveContact} />
        ) : (
          <p className={css.noContacts}>Huh... Still no contacts here!</p>
        )}
      </section>
    </div>
  );
};
