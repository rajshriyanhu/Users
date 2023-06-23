export const ADD_TO_TEAM = "ADD_TO_TEAM";

export const addToTeam = (item) => {
  return {
    type: ADD_TO_TEAM,
    payload: item,
  };
};

export const REMOVE_FROM_TEAM = "REMOVE_FROM_TEAM";

export const removeFromTeam = (id) => ({
  type: REMOVE_FROM_TEAM,
  payload: id,
});
