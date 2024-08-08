import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "../styles.css";

const Filters = ({ states, districts_of_states, onSubmit, onReset }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    if (selectedState) {
      const options = districts_of_states[selectedState.value].map(
        (district) => ({
          label: district,
          value: district,
        })
      );
      setDistrictOptions(options);
    } else {
      setDistrictOptions([]);
    }
  }, [selectedState, districts_of_states]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ startDate, endDate, selectedState, selectedDistrict });
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedState(null);
    setSelectedDistrict(null);
    setDistrictOptions([]);
    onReset();
  };

  return (
    <div className="filter-box">
      <form onSubmit={handleSubmit}>
        <div className="form-group date">
          <label>From: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a Date"
            className="datepicker-input"
          />
        </div>
        <div className="form-group date">
          <label>To:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a Date"
            className="datepicker-input"
          />
        </div>
        <div className="form-group select">
          <label>State:</label>
          <Select
            options={states}
            value={selectedState}
            onChange={setSelectedState}
            placeholder="Select State"
            classNamePrefix="Select"
          />
        </div>
        <div className="form-group select">
          <label>District:</label>
          <Select
            options={districtOptions}
            value={selectedDistrict}
            onChange={setSelectedDistrict}
            isDisabled={!selectedState}
            placeholder="Select District"
            classNamePrefix="Select"
          />
        </div>
        <div className="form-group button">
          <button className="form-button" type="submit">
            Submit
            <span className="transition"></span>
          </button>
        </div>
        <div className="form-group button">
          <button className="form-button" type="button" onClick={handleReset}>
            Reset
            <span className="transition"></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
