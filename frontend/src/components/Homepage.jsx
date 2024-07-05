import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Modal from "./Modal";
import Transactions from "./Transactions";

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
    try {
      axios
        .delete(`${BASE_URL}/delete/${id}`)
        .then((response) => {
          window.location.reload();
        })
        .then((response) => {
          allTransactions();
        })
        .catch((error) => console.error("Error deleting"));
    } catch (error) {}
  };

  const setTotal = () => {
    axios
      .get(`${BASE_URL}/total`)
      .then((response) => {
        setgst(response.data.totalGst);
        setinwards(response.data.totalInwards);
      })
      .catch((error) => {
        console.error("Error fetching total data:", error);
      });
  };

  const allTransactions = () => {
    axios.get(`${BASE_URL}/all`).then((response) => {
      setTransactions(response.data);
    });
  };

  useEffect(() => {
    setTotal();
    allTransactions();
  }, []);

  return (
    <div className='d-flex flex-column align-items-center mt-5'>
      <Card text={"GST"} number={gst} />
      <Card text={"Inwards"} number={inwards} />
      <button className='btn btn-primary' onClick={handleAddData}>
        {" "}
        + Add Data
      </button>
      {showModal && (
        <Modal
          setTotal={setTotal}
          allTransactions={allTransactions}
          modal={setShowModal}
        />
      )}

      <Transactions transactions={transactions} handleDelete={handleDelete} />
    </div>
  );
};

export default Homepage;
