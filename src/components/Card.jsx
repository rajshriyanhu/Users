import React from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import Button from "./Button";

const Card = ({ data }) => {
  return (
    <>
      <div className="w-60 h-min-56 mx-auto my-4 bg-slate-300 rounded-xl transform transition-all hover:translate-y-2 duration-300 shaodw-lg hover:shadow-2xl overflow-hidden">
        <div className="h-16 bg-blue-200 w-full relativeflex items-center jusitfy-center pt-4">
          <div className="h-20 w-20 bg-white rounded-full mx-auto left-16">
            <img
              className="h-full w-full object-cover rounded-full"
              src={data.avatar}
              alt=""
            />
          </div>
        </div>
        <div className="p-2 mt-12">
          <div className="flex justify-between">
            <h2 className="font-bold text-lg overflow-hidden whitespace-nowrap overflow-ellipsis">
              {data.first_name} {data.last_name}
            </h2>
            <div className="text-2xl">
              {data.gender === "Male" ? (
                <FaMale className="text-blue-800" />
              ) : (
                <FaFemale className="text-green-800" />
              )}
            </div>
          </div>

          <div className="flex justify-between my-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
            <p className="text-slate-600">{data.email}</p>
            <div className="text-xl pt-[4px]">
              <AiOutlineMail className="text-rose-400 cursor-pointer" />
            </div>
          </div>
          <p>{data.domain}</p>
          <Button 
            heading="Add to team"
            id={data.id}
            domain={data.domain} />
        </div>
      </div>
    </>
  );
};

export default Card;
