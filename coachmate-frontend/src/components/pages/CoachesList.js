import CoachCard from "../UI/CoachCard";
import classes from "./CoachesList.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CoachSearch from "../Coach/CoachSearch";
import CoachSearchFilter from "../Coach/CoachSearchFilter";

const DUMMY_VARS = [
  { id: 1, name: "John", avail: "9/9/22", location: "mel" },
  { id: 2, name: "Jack", avail: "10/10/22", location: "mel" },
  { id: 3, name: "James", avail: "11/11/22", location: "mel" },
  { id: 4, name: "Jamie", avail: "12/12/22", location: "mel" },
];

const initialFilterFormData = {
  name: "",
  location: "",
  priceRange: [20, 100],
  sessionType: {
    private: true,
    group: true,
  },
};

function CoachesList() {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filterFormData, setFilterFormData] = useState(initialFilterFormData);

  const minDistance = 10;
  const maxPrice = 100;
  function handlePriceSlider(event, newValue, activeThumb) {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxPrice - minDistance);
        setFilterFormData({
          ...filterFormData,
          priceRange: [clamped, clamped + minDistance],
        });
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setFilterFormData({
          ...filterFormData,
          priceRange: [clamped - minDistance, clamped],
        });
      }
    } else {
      setFilterFormData({
        ...filterFormData,
        priceRange: newValue,
      });
    }
  }

  function handleSearchVal(event) {
    if (openFilter) {
      if (event.target.id === "name") {
        setFilterFormData({
          ...filterFormData,
          name: event.target.value.trim(),
        });
      }
      if (event.target.id === "location") {
        setFilterFormData({
          ...filterFormData,
          location: event.target.value.trim(),
        });
      }
    } else {
      setSearchVal(event.target.value);
    }
  }

  function handleCheckbox(event) {
    if (event.target.id === "private") {
      setFilterFormData({
        ...filterFormData,
        sessionType: {
          ...filterFormData.sessionType,
          private: !filterFormData.sessionType.private,
        },
      });
    }
    if (event.target.id === "group") {
      setFilterFormData({
        ...filterFormData,
        sessionType: {
          ...filterFormData.sessionType,
          group: !filterFormData.sessionType.group,
        },
      });
    }
  }

  function handleOpenFilter() {
    setOpenFilter(!openFilter);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(searchVal);
    console.log(filterFormData);

    setOpenFilter(false);

    setSearchVal("");
    setFilterFormData(initialFilterFormData);
  }

  return (
    <div className={classes["coach-list"]}>
      {!openFilter && (
        <CoachSearch
          onButtonClick={handleOpenFilter}
          onSubmit={handleFormSubmit}
          onInput={handleSearchVal}
        />
      )}
      {openFilter && (
        <CoachSearchFilter
          sliderVal={filterFormData.priceRange}
          onSliderChange={handlePriceSlider}
          onButtonClick={handleOpenFilter}
          maxSliderVal={maxPrice}
          onSubmit={handleFormSubmit}
          onInput={handleSearchVal}
          onCheckboxChange={handleCheckbox}
        />
      )}
      <section className={classes["coach-cards"]}>
        {DUMMY_VARS.map((coach) => {
          return (
            <CoachCard
              key={coach.id}
              name={coach.name}
              avail={coach.avail}
              location={coach.location}
              onClick={() => {
                navigate("/schedule", { state: { coach: coach } });
              }}
            />
          );
        })}
      </section>
    </div>
  );
}

export default CoachesList;
