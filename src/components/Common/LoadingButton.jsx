import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const LoadingButton = ({ children, loading, disabled, spinnerVariant, ...rest }) => {
  return (
    <React.Fragment>
      <Button {...rest} disabled={disabled}>
        {loading ? <Spinner variant={spinnerVariant} size='sm' /> : children}
      </Button>
    </React.Fragment>
  );
};

export default LoadingButton;
