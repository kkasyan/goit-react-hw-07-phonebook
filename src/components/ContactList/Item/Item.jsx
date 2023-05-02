import css from './item.module.css';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { removeContact } from 'redux/contacts/operations';

import { FormButton } from 'components/shared/FormButton/FormButton';

const Item = ({ contact: { name, phone, id } }) => {
  const dispatch = useDispatch();

  const onRemoveContact = id => {
    dispatch(removeContact(id));
  };

  return (
    <li className={css.item}>
      <p className={css.contactItem}>{name}</p>
      <p className={css.contactItem}>{phone}</p>
      <FormButton onRemove={() => onRemoveContact(id)} text="Delete" />
    </li>
  );
};

Item.propTypes = {
  removeContact: PropTypes.func,
};

export default memo(Item);
