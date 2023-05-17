import {
  POST_PRAYS,
  ADD_PRAYS,
  DELETE_PRAY,
  EDIT_PRAY,
  COMBINE_PRAYS,
} from "../_actions/types";

const prayReducer = (state: any = { allPrays: [] }, action: any) => {
  switch (action.type) {
    case POST_PRAYS:
      return { ...state, prays: action.payload };

    case COMBINE_PRAYS:
      const copyAllPrays = [...state.allPrays, ...action?.payload];
      state.allPrays = [...copyAllPrays];
      return { ...state };

    case ADD_PRAYS:
      return { ...state, prays: action.payload };
    case EDIT_PRAY:
      return { ...state, prays: action.payload };
    case DELETE_PRAY:
      return { ...state, prays: action.payload };
    default:
      return state;
  }
};

export default prayReducer;
