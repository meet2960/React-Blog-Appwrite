import React, { useId } from 'react';
import { Form } from 'react-bootstrap';

const InputField = React.forwardRef(function InputField({ label, type = 'text', className = '', ...props }, ref) {
  const id = useId();
  return (
    <React.Fragment>
      <React.Fragment>
        {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
        <input type={type} className={`form-control ${className}`} ref={ref} id={id} {...props} />
      </React.Fragment>
    </React.Fragment>
  );
});

export default InputField;
