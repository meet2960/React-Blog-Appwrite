import React, { useId } from "react";
import { Form } from "react-bootstrap";

const SelectField = (
  { options = [], label, className = "", ...props },
  ref
) => {
  const id = useId();
  return (
    <React.Fragment>
      {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
      <select
        ref={ref}
        className={`form-control ${className}`}
        {...props}
        id={id}
      >
        {options &&
          options.map((items) => (
            <option value={items.toLowerCase()} key={items}>
              {items}
            </option>
          ))}
      </select>
    </React.Fragment>
  );
};

export default React.forwardRef(SelectField);
