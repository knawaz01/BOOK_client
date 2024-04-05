// client/src/components/DeleteBookForm.js

import React from 'react';
import axios from 'axios';


const DeleteBookForm = ({ bookId, onDelete }) => {
  const handleDelete = async () => {
    try {

      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/books/${bookId}`);
      onDelete(); // Notify the parent component that deletion is done
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <button className="btn btn-danger mx-2" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteBookForm;
