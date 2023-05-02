import css from './contactList.module.css';
import PropTypes from 'prop-types';
import { getFilteredContacts } from 'redux/contacts/selectors';
import { useSelector } from 'react-redux';

import Item from './Item/Item';

export const ContactList = () => {
  const contacts = useSelector(getFilteredContacts);

  const elements = contacts.map(item => <Item key={item.id} contact={item} />);
  return (
    <>
      <ul className={css.list}>{elements}</ul>
    </>
  );
};

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
};
