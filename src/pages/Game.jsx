import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleCard from "../components/SingleCard";
import {
  shuffleCards,
  makeChoice,
  compareCards,
  resetTurn,
  setWin,
} from "../slices/gameSlice";

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
    dispatch(setWin());

    if (choiceOne && !choiceTwo) {
      setTimeout(() => {
        dispatch(compareCards());
        dispatch(resetTurn());
      }, 1000);
    }
  };

  return (
    <div className="App bg-slate-300 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">Magic Match</h1>
      <button
        onClick={handleNewGame}
        className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded-lg mb-4 shadow-md"
      >
        New Game
      </button>
      {isWin && <p className="text-2xl text-green-500 mb-6">You Win! 🎉</p>}
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 justify-center  max-w-4xl px-4">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleCardChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="mt-4 text-xl">Turns: {turns}</p>
    </div>
  );
};

export default Game;
