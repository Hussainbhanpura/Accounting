import React from "react";

const Transactions = ({ transactions, handleDelete }) => {
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
                    onClick={() => handleDelete(transaction._id)}
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
    </div>
  );
};

export default Transactions;
