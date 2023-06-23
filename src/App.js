import React, { useState } from "react";
import data from "./Data/data";
import Card from "./components/Card";
import { useSelector } from "react-redux";
import TeamMember from "./components/TeamMember";
import Pagination from "./components/Pagination";
import { BsMicrosoftTeams } from "react-icons/bs";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [domainFilter, setDomainFilter] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [showSelectDomain, setShowSelectDomain] = useState(false);
  const [showSelectGender, setShowSelectGennder] = useState(false);
  const [showSelectAvail, setShowSelectAvail] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const team = useSelector((state) => state.team);

  // filter data
  const filteredData = data.filter((item) => {
    const domainMatch =
      domainFilter.length === 0 ||
      domainFilter.some(
        (domain) => domain.toLowerCase() === item.domain.toLowerCase()
      );
    const genderMatch =
      selectedGenders.length === 0 ||
      selectedGenders.includes(item.gender.toLowerCase());
    const availabilityMatch =
      selectedAvailabilities.length === 0 ||
      selectedAvailabilities.includes(String(item.available));
    const nameMatch =
      item.first_name.toLowerCase().includes(nameSearch.toLowerCase()) ||
      item.last_name.toLowerCase().includes(nameSearch.toLowerCase());
    return domainMatch && genderMatch && availabilityMatch && nameMatch;
  });

  // pagination
  const cardsPerPage = 20;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredData.length / cardsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filtering
  const handleNameSearchChange = (event) => {
    setNameSearch(event.target.value);
    setCurrentPage(1);
  };

  // display team section
  const handleShowteam = () => {
    setShowTeam((prev) => !prev);
  };

  // domain checkbox change
  const handleDomainCheckboxChange = (event) => {
    const domain = event.target.value;
    if (event.target.checked) {
      setDomainFilter((prevFilter) => [...prevFilter, domain]);
    } else {
      setDomainFilter((prevFilter) =>
        prevFilter.filter((item) => item !== domain)
      );
    }
    setCurrentPage(1);
  };
  const handleShowSelect = () => {
    setShowSelectDomain((prev) => !prev);
  };

  // gender checkbox change
  const handleGenderCheckboxChange = (event) => {
    const gender = event.target.value;
    if (event.target.checked) {
      setSelectedGenders((prevGenders) => [...prevGenders, gender]);
    } else {
      setSelectedGenders((prevGenders) =>
        prevGenders.filter((item) => item !== gender)
      );
    }
    setCurrentPage(1);
  };
  const handleShowGender = () => {
    setShowSelectGennder((prev) => !prev);
  };

  // availability checkbox change
  const handleAvailabilityCheckboxChange = (event) => {
    const availability = event.target.value;
    if (event.target.checked) {
      setSelectedAvailabilities((prevAvailabilities) => [
        ...prevAvailabilities,
        availability,
      ]);
    } else {
      setSelectedAvailabilities((prevAvailabilities) =>
        prevAvailabilities.filter((item) => item !== availability)
      );
    }
    setCurrentPage(1);
  };
  const handleShowAvail = () => {
    setShowSelectAvail((prev) => !prev);
  };

  // extract all domains
  const extractUniqueDomains = (data) => {
    const uniqueDomains = [...new Set(data.map((item) => item.domain))];
    return uniqueDomains;
  };
  const uniqueDomains = extractUniqueDomains(data);

  return (
    <div>
      {/* Filter & Search */}
      <div className="flex flex-col gap-4 py-4 px-4 justify-evenly bg-slate-700 sm:flex-row md:flex-row lg:flex-row xl:flex-row relative z-10">
        <div className="mx-auto ">
          <input
            type="text"
            value={nameSearch}
            onChange={handleNameSearchChange}
            placeholder="Search by name"
            className="h-10 px-2 w-32 rounded-full cursor-pointer w-[250px] xs:w-[130px] md:w-[130px] lg:w-[130px]"
          />
        </div>
        <div className="mx-auto relative">
          <div
            className="cursor-pointer bg-blue-300 px-2 py-2 rounded-full flex items-center justify-between  w-[250px] xs:w-[130px] md:w-[130px] lg:w-[130px]"
            onClick={handleShowSelect}
          >
            Domain
          </div>
          {showSelectDomain && (
            <div className="absolute top-full bg-white border border-gray-300 rounded-lg shadow-md z-50  w-[250px] xs:w-[133px] md:w-[133px] lg:w-[133px]">
              {uniqueDomains.map((option, index) => (
                <div key={index} className="py-2 px-2 hover:bg-gray-200">
                  <input
                    type="checkbox"
                    value={option}
                    checked={domainFilter.includes(option)}
                    onChange={handleDomainCheckboxChange}
                    className="mr-2 cursor-pointer"
                  />
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mx-auto relative">
          <div
            className="cursor-pointer bg-blue-300 px-2 py-2 rounded-full flex items-center justify-between  w-[250px] xs:w-[130px] md:w-[130px] lg:w-[130px]"
            onClick={handleShowGender}
          >
            Gender
          </div>
          {showSelectGender && (
            <div className="absolute top-full right-0 bg-white border border-gray-300 rounded-lg shadow-md z-50 w-[250px] xs:w-[130px] md:w-[130px] lg:w-[130px]">
              <div className="py-2 px-2 hover:bg-gray-200">
                <input
                  type="checkbox"
                  value="male"
                  checked={selectedGenders.includes("male")}
                  onChange={handleGenderCheckboxChange}
                  className="mr-2 cursor-pointer"
                />
                Male
              </div>
              <div className="py-2 px-2 hover:bg-gray-200">
                <input
                  type="checkbox"
                  value="female"
                  checked={selectedGenders.includes("female")}
                  onChange={handleGenderCheckboxChange}
                  className="mr-2 cursor-pointer"
                />
                Female
              </div>
            </div>
          )}
        </div>
        <div className="mx-auto relative">
          <div
            className="cursor-pointer bg-blue-300 px-2 py-2 rounded-full flex items-center justify-between  w-[250px] xs:w-[130px] md:w-[130px] lg:w-[130px]"
            onClick={handleShowAvail}
          >
            Availability
          </div>
          {showSelectAvail && (
            <div className="absolute top-full right-0 bg-white border border-gray-300 rounded-lg shadow-md z-50  w-[250px] xs:w-[130px] md:w-[130px] lg:w-[130px]">
              <div className="py-2 px-2 hover:bg-gray-200">
                <input
                  type="checkbox"
                  value="true"
                  checked={selectedAvailabilities.includes("true")}
                  onChange={handleAvailabilityCheckboxChange}
                  className="mr-2 cursor-pointer"
                />
                Available
              </div>
              <div className="py-2 px-2 hover:bg-gray-200">
                <input
                  type="checkbox"
                  value="false"
                  checked={selectedAvailabilities.includes("false")}
                  onChange={handleAvailabilityCheckboxChange}
                  className="mr-2 cursor-pointer"
                />
                Unavailable
              </div>
            </div>
          )}
        </div>
        <div
          onClick={handleShowteam}
          className="mx-auto cursor-pointer bg-blue-300 px-2 py-2 rounded-full flex items-center justify-evenly h-10 w-[250px] xs:w-[170px] md:w-[170px] lg:w-[170px]"
        >
          {showTeam ? "Hide" : "Show"} team ({team.length}) <BsMicrosoftTeams />
        </div>
      </div>

      {/* Card Display */}

      {showTeam ? (
        <TeamMember />
      ) : (
        <div className="py-4 bg-slate-800 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1 px-auto py-auto">
          {currentCards.map((item, index) => (
            <Card data={item} key={index} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!showTeam && (
        <div className="bg-slate-700 py-4 flex items-center w-full z-9">
          {filteredData.length > cardsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
