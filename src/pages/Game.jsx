import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleCard from "../components/SingleCard";
import {
  shuffleCards,
  makeChoice,
  compareCards,
  resetTurn,
} from "../slices/gameSlice";
import { Button, Typography, Box } from "@mui/material";

const Game = () => {
  const dispatch = useDispatch();
  const { cards, turns, choiceOne, choiceTwo, disabled, isWin } = useSelector(
    (state) => state.game
  );

  const handleNewGame = () => {
    dispatch(shuffleCards());
  };

  const handleCardChoice = (card) => {
    dispatch(makeChoice(card));

    if (choiceOne && !choiceTwo) {
      setTimeout(() => {
        dispatch(compareCards());
        dispatch(resetTurn());
      }, 1000);
    }
  };

  return (
    <div className="App bg-slate-300 min-h-screen flex flex-col items-center justify-center text-white">
      <Typography
        variant="h3"
        component="h1"
        className="mb-6"
        sx={{ marginTop: "24px", color: "black" }}
      >
        Memory Match
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleNewGame}
        className="m-12"
        sx={{ margin: "12px" }}
      >
        New Game
      </Button>

      <Typography variant="h6" className="mt-4" color="primary">
        Turns: {turns}
      </Typography>

      {isWin && (
        <Typography variant="h5" color="success.main" className="mb-6">
          You Win! 🎉
        </Typography>
      )}

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        sx={{
          maxWidth: "lg",
          px: 2,
        }}
      >
        {cards.map((card) => (
          <Box
            key={card.id}
            sx={{
              margin: "20px",
            }}
          >
            <SingleCard
              card={card}
              handleChoice={handleCardChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Game;
