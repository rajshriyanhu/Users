export const ADD_TO_TEAM = "ADD_TO_TEAM";

export const addToTeam = (item) => {
  return {
    type: ADD_TO_TEAM,
    payload: item,
  };
};
