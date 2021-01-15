import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const FormButton = ({ children, className, buttonType, clickHandler }) => {
  return (
    <button className={className} type={buttonType} onClick={clickHandler}>
      {children}
    </button>
  );
};

FormButton.propTypes = {
  className: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default FormButton;
