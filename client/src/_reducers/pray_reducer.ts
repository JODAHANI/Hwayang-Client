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
      const copyAllPraysAdd = [...state.allPrays];
      copyAllPraysAdd.unshift(action.payload.pray);
      state.allPrays = [...copyAllPraysAdd];
      return { ...state, prays: action.payload };
    case EDIT_PRAY:
      const copyAllPraysEdit = [...state.allPrays];
      const findIndex = copyAllPraysEdit.findIndex((item) => {
        return item._id === action.payload.pray._id;
      });
      copyAllPraysEdit[findIndex] = action.payload.pray;
      state.allPrays = [...copyAllPraysEdit];
      return { ...state, prays: action.payload };
    case DELETE_PRAY:
      const copyAllPraysDelete = [...state.allPrays];
      const fillterAllpray = copyAllPraysDelete.filter((item) => {
        return item._id !== action.payload.pray._id;
      });
      state.allPrays = [...fillterAllpray];
      return { ...state, prays: action.payload };
    default:
      return state;
  }
};

export default prayReducer;
