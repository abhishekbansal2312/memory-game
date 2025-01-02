import React from "react";
import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className={`card perspective-1000 mx-2`}>
      <div
        className={`cardrelative transform-style-preserve-3d transition-transform duration-500 ${
          flipped ? "flipped" : ""
        }`}
      >
        <img
          className="front absolute backface-hidden rounded-lg shadow-lg"
          src={`${card.src}`}
          alt="card front"
        />
        <img
          className=" card back absolute backface-hidden bg-gray-800 cursor-pointer rounded-lg shadow-lg z-10"
          src="/image.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
