// MaskedInput.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

const MaskedInput = React.forwardRef(function MaskedInput(props, ref) {
  const { mask, definitions, onChange, name, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={definitions}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name, value } })}
      overwrite
    />
  );
});

MaskedInput.propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  definitions: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default MaskedInput;
