import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Modal from "./Modal";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Homepage = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [gst, setgst] = useState(0);
  const [inwards, setinwards] = useState(0);

  const handleAddData = () => {
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/total`)
      .then((response) => {
        console.log(BASE_URL);
        setgst(response.data.totalGst);
        setinwards(response.data.totalInwards);
      })
      .catch((error) => {
        console.error("Error fetching total data:", error);
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
    </div>
  );
};

export default Homepage;
