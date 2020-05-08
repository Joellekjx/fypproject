import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const singleCheckbox = ({ type = 'checkbox', name, checked = true, onChange }) => (
  <Checkbox type={type} name={name} checked={checked} onChange={onChange} />
);

singleCheckbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default singleCheckbox;