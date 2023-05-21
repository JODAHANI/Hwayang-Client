import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT,
  USER_WORSHIP_DATA,
  CANCEL_WORSHIP,
  GET_USER_DATA,
} from "../_actions/types";

const userReducer = (state = {}, action: any) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case USER_WORSHIP_DATA:
      return { ...state, userWorshipData: action.payload };
    case CANCEL_WORSHIP:
      return { ...state, userWorshipData: action.payload };
    case GET_USER_DATA:
      return { ...state, userDocuments: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userReducer;
