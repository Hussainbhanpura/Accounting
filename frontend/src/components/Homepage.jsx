import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Modal from "./Modal";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [gst, setgst] = useState(0);
  const [inwards, setinwards] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleAddData = () => {
    setShowModal(true);
  };
  const handleDelete = (id) => {
    console.log(id);
    try {
      axios.delete(`${BASE_URL}/delete/${id}`).then((response) => {
        window.location.reload();
      });
    } catch (error) {}
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/total`)
      .then((response) => {
        setgst(response.data.totalGst);
        setinwards(response.data.totalInwards);
      })
      .catch((error) => {
        console.error("Error fetching total data:", error);
      });

    axios.get(`${BASE_URL}/all`).then((response) => {
      setTransactions(response.data);
    });
  }, []);

  return (
    <div className='d-flex flex-column align-items-center mt-5'>
      <Card text={"GST"} number={gst} />
      <Card text={"Inwards"} number={inwards} />
      <button className='btn btn-primary' onClick={handleAddData}>
        {" "}
        + Add Data
      </button>
      {showModal && <Modal modal={setShowModal} />}

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

export default Homepage;
