import React, { useState } from "react";
import data from "./Data/data";
import Card from "./components/Card";
import { useSelector } from "react-redux";
import TeamMember from "./components/TeamMember";
import Pagination from "./components/Pagination";
import {BsMicrosoftTeams} from 'react-icons/bs'

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [domainFilter, setDomainFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [showTeam, setShowTeam] = useState(false);
  const team = useSelector((state) => state.team);
  const cardsPerPage = 20;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const filteredData = data.filter((item) => {
    const domainMatch = item.domain
      .toLowerCase()
      .includes(domainFilter.toLowerCase());
    const genderMatch =
      genderFilter === "" ||
      item.gender.toLowerCase() === genderFilter.toLowerCase();
    const availabilityMatch =
      availabilityFilter === "" ||
      item.available === (availabilityFilter === "true");
    const nameMatch =
      item.first_name.toLowerCase().includes(nameSearch.toLowerCase()) ||
      item.last_name.toLowerCase().includes(nameSearch.toLowerCase());

    return domainMatch && genderMatch && availabilityMatch && nameMatch;
  });

  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / cardsPerPage);

  const handleDomainFilterChange = (event) => {
    setDomainFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleAvailabilityFilterChange = (event) => {
    setAvailabilityFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleNameSearchChange = (event) => {
    setNameSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleShowteam = () => {
    setShowTeam((prev) => !prev)
  }

  return (
    <div>
      <div className="flex flex-col gap-4 py-4 px-4 justify-evenly bg-slate-700 sm:flex-row md:flex-row lg:flex-row xl:flex-row">
        <div className="mx-auto">
          <input
            type="text"
            value={nameSearch}
            onChange={handleNameSearchChange}
            placeholder="Search by name"
            className="h-8 px-2 w-32 rounded-full"
          />
        </div>

        <div className="mx-auto">
          <input
            type="text"
            value={domainFilter}
            onChange={handleDomainFilterChange}
            placeholder="Domain"
            className="h-8 px-2 w-32 rounded-full"
          />
        </div>

        <div className="mx-auto">
          <select
            className="h-8 px-2 w-32 rounded-full"
            value={genderFilter}
            onChange={handleGenderFilterChange}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mx-auto">
          <select
            className="h-8 px-2 w-32 rounded-full"
            value={availabilityFilter}
            onChange={handleAvailabilityFilterChange}
          >
            <option value="">Availabilities</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>
        <div onClick={handleShowteam} className="mx-auto cursor-pointer bg-blue-300 px-2 py-2 rounded-full flex items-center justify-evenly h-8 w-[170px]">
          {showTeam ? 'Hide':'Show'} team ({team.length}) <BsMicrosoftTeams />
        </div>
      </div>

      <div className="py-4 bg-slate-800 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 px-auto py-auto">
        {showTeam ? 
            <TeamMember />
         : currentCards.map((item, index) => (
          <Card data={item} key={index} />
        ))}
      </div>

      {!showTeam && <div className="bg-slate-700 py-4 flex items-center w-full">
        {filteredData.length > cardsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>}
    </div>
  );
}

export default App;