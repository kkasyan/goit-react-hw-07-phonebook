import css from './app.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts } from 'redux/contacts/selectors';
import { fetchContacts } from 'redux/contacts/operations';

import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.wrap}>
      <h1>Phonebook</h1>
      <ContactForm />
      <section className={css.list}>
        <h2 className={css.contactsHeader}>Contacts</h2>
        <Filter />
        {contacts.length > 0 ? (
          <ContactList />
        ) : (
          <p className={css.noContacts}>Huh... Still no contacts here!</p>
        )}
      </section>
    </div>
  );
};
