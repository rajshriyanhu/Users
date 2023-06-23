import { ADD_TO_TEAM, REMOVE_FROM_TEAM } from "../action/teamAction";

const initialState = [];

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_TEAM:
      return [...state, action.payload];
    case REMOVE_FROM_TEAM:
      const updatedTeam = state.filter((item) => item.id !== action.payload);
      return updatedTeam;
    default:
      return state;
  }
};

export default teamReducer;
