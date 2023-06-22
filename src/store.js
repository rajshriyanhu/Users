import { createStore, combineReducers } from "redux";
import teamReducer from "./reducer/teamReducer";

const rootReducer = combineReducers({
  team: teamReducer,
});

const store = createStore(rootReducer);

export default store;
