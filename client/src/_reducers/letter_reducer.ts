import {
  GET_LETTERS,
  WRITE_LETTERS,
  COMBINE_LETTERS,
  ADD_LETTERS,
  EDIT_LETTERS,
  DELETE_LETTERS,
} from "_actions/types";

const letterReducer = (state: any = { allLetters: [] }, action: any) => {
  switch (action.type) {
    case GET_LETTERS:
      return { ...state, letters: action.payload };

    case WRITE_LETTERS:
      return { ...state, letters: action.payload };

    case COMBINE_LETTERS:
      const copyAllLetters = [...state.allLetters, ...action.payload];
      state.allLetters = copyAllLetters;
      return { ...state };

    case ADD_LETTERS:
      const copyAllLetter = [...state.allLetters];
      copyAllLetter.unshift(action.payload.letter);
      state.allLetters = copyAllLetter;
      return { ...state };

    case EDIT_LETTERS:
      const copyAllLetterEdit = [...state.allLetters];
      const {
        payload: { letter },
      } = action;
      const index = copyAllLetterEdit.findIndex((item) => {
        return item._id === letter._id;
      });
      copyAllLetterEdit[index] = letter;
      state.allLetters = [...copyAllLetterEdit];
      return { ...state };

    case DELETE_LETTERS:
      const copyAllLetterDelete = [...state.allLetters];
      const {
        payload: { letter: deleteLetter },
      } = action;
      const filterAllLetters = copyAllLetterDelete.filter((item) => {
        return item._id !== deleteLetter._id;
      });
      state.allLetters = [...filterAllLetters];
      return { ...state };
    default:
      return state;
  }
};
export default letterReducer;
