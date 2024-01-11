import React from 'react';
import { Button } from 'react-bootstrap';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
const NewPostBtn = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/add-post');
  };

  return (
    <React.Fragment>
      <Button variant='primary' className='add-new-btn' onClick={handleClick}>
        <IoMdAdd size={25} />
      </Button>
    </React.Fragment>
  );
};

export default NewPostBtn;
