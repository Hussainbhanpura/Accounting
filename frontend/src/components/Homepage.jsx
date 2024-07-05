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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const allTransactions = (page) => {
    axios.get(`${BASE_URL}/all?page=${page}`).then((response) => {
      console.log(response);
      setTransactions(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    });
  };

  useEffect(() => {
    setTotal();
    allTransactions(1);
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      allTransactions(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      allTransactions(currentPage - 1);
    }
  };
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
      <div className='d-flex justify-content-between align-items-center mt-3'>
        <button
          className='btn btn-secondary me-2'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <i className='fas fa-chevron-left'></i>
        </button>
        <span className='mx-2'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className='btn btn-secondary ms-2'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <i className='fas fa-chevron-right'></i>
        </button>
      </div>
    </div>
  );
};

export default Homepage;
