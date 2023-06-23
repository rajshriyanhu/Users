import React from "react";
import data from "../Data/data";
import { useDispatch, useSelector } from "react-redux";
import { addToTeam, removeFromTeam } from "../action/teamAction";
import toast from 'react-hot-toast';

const Button = ({ heading, id, add }) => {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);

  const handleAddToTeam = () => {
    const current = data.find((item) => item.id === id);
    if (current.available) {
      if (team.length === 0) {
        dispatch(addToTeam(current));
        toast.success("Member added to team");
      } else {
        const isPresent = team.some((item) => item.id === current.id);
        if(isPresent){
          toast.error("Member already in team!")
          return;
        }
        const isSameDomain = team.some((item) => item.domain === current.domain);
        if (!isSameDomain) {
          toast.error("Domain does not match");
        } else {
          dispatch(addToTeam(current));
          toast.success("Member added to team");
        }
      }
    } else {
      toast.error("User is not available");
    }
    console.log(team);
  };

  const handleRemoveFromTeam = () => {
    dispatch(removeFromTeam(id));
  }

  return (
    <button
      onClick={add ? handleAddToTeam : handleRemoveFromTeam}
      className="h-10 w-full bg-blue-300 rounded-full hover:bg-blue-200 my-2 "
    >
      {heading}
    </button>
  );
};

export default Button;
