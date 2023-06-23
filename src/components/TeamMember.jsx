import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const TeamMember = () => {
  const team = useSelector((state) => state.team);

  if (team.length === 0)
    return (
      <div className="w-full h-[91vh] flex items-center bg-slate-800">
        <div className="mx-auto px-2 py-2 text-slate-100 md:text-4xl sm:text:2xl lg:text-5xl xl:text-5xl text-2xl">
          No members in the team. Please add members!
        </div>
      </div>
    );

  return (
    <>
      <div>
        <div className="w-full h-[8vh] flex items-center bg-slate-800">
          <div className="mx-auto px-2 py-2 text-slate-100 md:text-4xl sm:text:2xl lg:text-5xl xl:text-5xl text-2xl">
            Your team members
          </div>
        </div>
        <div className="w-full py-4 bg-slate-800 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 px-auto py-auto">
          {team.map((item, index) => (
            <Card data={item} key={index} remove={true} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamMember;
