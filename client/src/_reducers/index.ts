import { combineReducers } from "redux";
import user from "./user_reducer";
import pray from "./pray_reducer";
import home from "./home_reducer";
import letters from "./letter_reducer";
import newFamily from "./newFamily_reducer";
import graceShare from "./graceShare_reducer";
import worship from "./worship_reducer";
const rootReducer = combineReducers({
  user,
  pray,
  home,
  letters,
  newFamily,
  graceShare,
  worship,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
