import React from "react";
import { Card, CardActionArea } from "@mui/material";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  return (
    <div
      className="card-container perspective-1000 mx-2"
      style={{
        position: "relative",
        width: "200px",
        height: "200px",
      }}
    >
      <div
        className={`card-inner transform-style-preserve-3d transition-transform duration-500 ${
          flipped ? "flipped" : ""
        }`}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front of the card */}
        <div
          className="front absolute backface-hidden"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: flipped ? "rotateY(0deg)" : "rotateY(90deg)",
            transition: "transform 0.5s",
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src={card.src}
            alt="card front"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* Back of the card */}
        <div
          className="back absolute backface-hidden"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#333",
            cursor: "pointer",
            borderRadius: "6px",
            zIndex: 10,
            transform: flipped ? "rotateY(90deg)" : "rotateY(0deg)",
            transition: "transform 0.5s",
            backfaceVisibility: "hidden",
          }}
          onClick={handleClick}
        >
          <img
            src="/image.png"
            alt="card back"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
