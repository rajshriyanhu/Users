import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const TeamMember = () => {
  const team = useSelector((state) => state.team);

  if(team.length===0)return (
    <div className="w-[97vw] h-[86vh] flex items-center">
      <div className="mx-auto text-5xl text-slate-100">No members in the team. Please add members!</div>
    </div>
  )

  return team.map((item, index) => <Card data={item} key={index} />);
};

export default TeamMember;
