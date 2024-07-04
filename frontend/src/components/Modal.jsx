import React, { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Modal = ({ modal }) => {
  const [inwardsAmount, setinwards] = useState(0);
  const [purchaseAmount, setpurchase] = useState(0);
  const [gstRate, setgstRate] = useState(18);
  const [gst, setgst] = useState(0);

  const handleSubmit = async () => {
    axios.post(`${BASE_URL}/data`, {
      inwardsAmount,
      purchaseAmount,
      gst,
    });
    window.refresh();
    modal(false);
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };
  useEffect(() => {
    setgst((purchaseAmount * gstRate) / 100);
  }, [purchaseAmount, gstRate]);
  return (
    <div
      className='modal fade show'
      tabIndex='-1'
      role='dialog'
      style={{ display: "block" }}
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
            <h5 className='modal-title'>Add Purchase</h5>
          </div>

          <div className='container mt-5'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='inwards'>Inwards</label>
                <input
                  value={inwardsAmount}
                  onChange={(e) => handleInputChange(e, setinwards)}
                  id='inwards'
                  type='number'
                  className='form-control'
                  style={{ width: "50%" }}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='purchase'>Purchase</label>
                <input
                  onChange={(e) => handleInputChange(e, setpurchase)}
                  value={purchaseAmount}
                  id='purchase'
                  type='number'
                  className='form-control'
                  style={{ width: "50%" }}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='gst'>GST Rate</label>
                <input
                  onChange={(e) => handleInputChange(e, setgstRate)}
                  value={gstRate}
                  id='gst'
                  type='number'
                  className='form-control'
                  style={{ width: "50%" }}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='gst'>GST</label>
                <input
                  onChange={(e) => handleInputChange(e, setgst)}
                  value={gst}
                  id='gst'
                  type='number'
                  className='form-control'
                  style={{ width: "50%" }}
                />
              </div>
              <div className='text-center'></div>

              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                  onClick={() => modal(false)}
                >
                  Close
                </button>
                <button type='submit' className='btn btn-primary'>
                  Add Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
