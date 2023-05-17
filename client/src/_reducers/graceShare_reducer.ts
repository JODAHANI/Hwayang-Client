import {
  GET_GRACE_SHARE,
  COMBINE_GRACE_SHARE,
  DELETE_GRACE_SHARE,
  ADD_GRACE_SHARE,
} from "_actions/types";

const graceShareReducer = (state = { allGraceSharing: [] }, action: any) => {
  switch (action.type) {
    case GET_GRACE_SHARE:
      return { ...state, graceSharing: action.payload };
    case COMBINE_GRACE_SHARE: {
      const copyAllLetters = [...state.allGraceSharing, ...action.payload];
      state.allGraceSharing = copyAllLetters;
      return { ...state };
    }
    case ADD_GRACE_SHARE:
      if (action.payload.success) {
        const copyAllGraceSharing = [...state.allGraceSharing];
        copyAllGraceSharing.unshift(action.payload.graceSharing);
        state.allGraceSharing = copyAllGraceSharing;
      }
      return { ...state };
    case DELETE_GRACE_SHARE:
      const copy = [...action.payload.graceSharing];
      state.allGraceSharing = copy;
      return { ...state };
    default:
      return state;
  }
};
export default graceShareReducer;
