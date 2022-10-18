import CoachCard from "../UI/CoachCard";
import axios from "axios";
import classes from "./CoachesList.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoachSearch from "../Coach/CoachSearch";
import CoachSearchFilter from "../Coach/CoachSearchFilter";

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
  const [users, setUsers] = useState([]);

  const getData = () => {
    axios
      .get("/users")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setUsers(data);
        console.log(data);
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  useEffect(() => {
    getData();
  }, []);

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
        {users.map((coach, index) => {
          return (
            <CoachCard
              key={index}
              name={coach.firstName}
              avail={coach.avail}
              location={coach.address}
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
