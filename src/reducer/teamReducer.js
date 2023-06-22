import { ADD_TO_TEAM } from "../action/teamAction";

const initialState = [];

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_TEAM:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default teamReducer;
