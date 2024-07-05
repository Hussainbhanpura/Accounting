import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Assuming you're using react-bootstrap

const Transactions = ({ transactions, handleDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openConfirmModal = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };
  const confirmDelete = () => {
    handleDelete(deleteId);
    setShowConfirmModal(false);
  };

  return (
    <div>
      <div className='table-responsive'>
        <table className='table table-striped table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th>Inwards</th>
              <th>Purchase</th>
              <th>GST</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.inwardsAmount}</td>
                <td>{transaction.purchaseAmount}</td>
                <td>{transaction.gst}</td>
                <td>
                  <button className='btn btn-sm btn-info mr-2' title='Edit'>
                    <i className='fas fa-edit'></i>
                  </button>
                  <button
                    className='btn btn-sm btn-danger'
                    onClick={() => openConfirmModal(transaction._id)}
                    title='Delete'
                  >
                    <i className='fas fa-trash-alt'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this transaction?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant='danger' onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Transactions;
