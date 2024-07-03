// Card.jsx
import React from "react";

const Card = ({ text, number }) => {
  return (
    <div
      className='card border-primary mb-3'
      style={{ minWidth: "12rem", minHeight: "10rem" }}
    >
      <div className='card-header text-center'>{text}</div>
      <div className='card-body text-primary'>
        <h5 className='card-title text-center mt-3'>{number}</h5>
      </div>
    </div>
  );
};

export default Card;
