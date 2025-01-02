import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
  turns: 0,
  choiceOne: null,
  choiceTwo: null,
  disabled: false,
  isWin: false,
};

const cardImages = [
  { src: "/images/img_1.jpeg", matched: false },
  { src: "/images/img_2.jpeg", matched: false },
  { src: "/images/img_3.jpeg", matched: false },
  { src: "/images/img_4.jpeg", matched: false },
  { src: "/images/img_5.jpeg", matched: false },
  { src: "/images/img_6.jpeg", matched: false },
];

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    shuffleCards(state) {
      const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));
      state.cards = shuffledCards;
      state.turns = 0;
      state.choiceOne = null;
      state.choiceTwo = null;
      state.disabled = false;
      state.isWin = false;
    },
    makeChoice(state, action) {
      if (state.choiceOne) {
        state.choiceTwo = action.payload;
      } else {
        state.choiceOne = action.payload;
      }
    },
    compareCards(state) {
      if (state.choiceOne && state.choiceTwo) {
        if (state.choiceOne.src === state.choiceTwo.src) {
          state.cards = state.cards.map((card) =>
            card.src === state.choiceOne.src ? { ...card, matched: true } : card
          );
        } else {
          state.disabled = true;
        }
        state.choiceOne = null;
        state.choiceTwo = null;
      }
    },
    resetTurn(state) {
      state.turns += 1;
      state.disabled = false;
    },
    setWin(state) {
      if (state.cards.every((card) => card.matched)) {
        state.isWin = true;
      }
    },
    checkForWin(state) {
      const allMatched = state.cards.every((card) => card.matched);
      if (allMatched) {
        state.isWin = true;
      }
    },
  },
});

export const {
  shuffleCards,
  makeChoice,
  compareCards,
  resetTurn,
  setWin,
  checkForWin,
} = gameSlice.actions;
export default gameSlice.reducer;
