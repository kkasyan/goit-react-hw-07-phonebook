import css from './app.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { addContact, removeContact } from 'redux/contacts/slice';
import { setFilter } from 'redux/filter/slice';
import { getFilteredContacts } from 'redux/contacts/selectors';
import { getFilter } from 'redux/filter/selectors';

import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const contacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const onAddContact = payload => {
    const action = addContact(payload);
    dispatch(action);
  };

  const onRemoveContact = payload => {
    dispatch(removeContact(payload));
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
