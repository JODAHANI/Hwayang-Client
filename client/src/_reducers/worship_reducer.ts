import { GET_WORSHIP, APPLY_WORSHIP, SUBTRACT_USER } from "_actions/types";

function worshipReducer(state = { allWorship: [] }, action: any) {
  switch (action.type) {
    case GET_WORSHIP:
      if (action.payload.success) {
        const copyAllWorship = [...action.payload.offLineWorship];
        state.allWorship = [...copyAllWorship];
      }
      return { ...state, worship: action.payload };
    case APPLY_WORSHIP:
      if (action.payload.success) {
        const copyAllWorshipApply = [...state.allWorship];
        const {
          payload: { offLineWorship },
        } = action;
        const index = copyAllWorshipApply.findIndex((item) => {
          return item._id === offLineWorship._id;
        });
        console.log(index);
        copyAllWorshipApply[index] = offLineWorship;
        state.allWorship = [...copyAllWorshipApply];
      }
      return { ...state };
    case SUBTRACT_USER:
      const {
        payload: { id, userId },
      } = action;
      const copyAllWorshipSubtract = [...state.allWorship];
      const filterWorship = copyAllWorshipSubtract.filter((item) => {
        return id === item._id;
      });
      const userSubtractParti = filterWorship[0].parti.filter((person) => {
        return person !== userId;
      });
      const findIndex = copyAllWorshipSubtract.findIndex((item) => {
        return id === item._id;
      });
      copyAllWorshipSubtract[findIndex].parti = userSubtractParti;
      state.allWorship = [...copyAllWorshipSubtract];
      return { ...state };
    default:
      return state;
  }
}

export default worshipReducer;
