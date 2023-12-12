import React, { useId } from 'react';
import { Form } from 'react-bootstrap';

export const SelectField = ({ options = [], label, className = '', ...props }, ref) => {
  const id = useId();
  return (
    <React.Fragment>
      {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
      <select ref={ref} className={`form-control ${className}`} {...props} id={id}>
        {options &&
          options.map(items => (
            <option value={items.toLowerCase()} key={items}>
              {items}
            </option>
          ))}
      </select>
    </React.Fragment>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.forwardRef(SelectField);
