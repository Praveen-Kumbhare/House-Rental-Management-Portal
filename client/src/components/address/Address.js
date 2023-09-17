// Address.js
import React, { useEffect, useState } from "react";
import { City, State } from "country-state-city";

const Address = ({ onInputChange, addressData }) => {
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [data, setData] = useState({
    city: addressData?.city || "",
    areaDesc: addressData?.areaDesc || "",
    postalCode: addressData?.postalCode || "",
    state: addressData?.state || "",
  });

  useEffect(() => {
    setStateData(
      State.getStatesOfCountry("IN").map((state) => ({
        value: state.isoCode,
        displayValue: state.name,
      }))
    );

    setSelectedState(addressData?.state || "");

    const citiesOfSelectedState = City.getCitiesOfState(
      "IN",
      addressData?.state || ""
    );
    setCityData(
      citiesOfSelectedState.map((city) => ({
        value: city.name,
        displayValue: city.name,
      }))
    );
  }, [addressData?.state]);

  useEffect(() => {
    setData({
      city: addressData?.city || "",
      areaDesc: addressData?.areaDesc || "",
      postalCode: addressData?.postalCode || "",
      state: addressData?.state || "",
    });
  }, [addressData]);

  const handleInputField = (field, value) => {
    const updatedData = {
      ...data,
      [field]: value,
    };
    setData(updatedData);
    onInputChange(updatedData);
  };

  const handleStateChange = (selectedStateValue) => {
    setSelectedState(selectedStateValue);

    const citiesOfSelectedState = City.getCitiesOfState(
      "IN",
      selectedStateValue
    );
    setCityData(
      citiesOfSelectedState.map((city) => ({
        value: city.name,
        displayValue: city.name,
      }))
    );
  };

  return (
    <div>
      <h4>Address Details</h4>
      <div className="input-group">
        <label htmlFor="city">Select City</label>
        <select
          id="city"
          onChange={(e) => handleInputField("city", e.target.value)}
          value={data.city}
        >
          <option value={""}>Select City</option>
          {cityData.map((loc, index) => (
            <option key={index} value={loc.value}>
              {loc.displayValue}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="state">Select State</label>
        <select
          id="state"
          onChange={(e) => {
            handleInputField("state", e.target.value);
            handleStateChange(e.target.value);
          }}
          value={data?.state}
        >
          <option value={""}>Select State</option>
          {stateData.map((loc, index) => (
            <option key={index} value={loc.value}>
              {loc.displayValue}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="areaDesc">Area Description</label>
        <textarea
          id="areaDesc"
          placeholder="Area Description"
          value={data.areaDesc}
          onChange={(e) => handleInputField("areaDesc", e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="postalCode">Area Code</label>
        <input
          type="text"
          id="postalCode"
          placeholder="Area Code"
          value={data.postalCode}
          onChange={(e) => handleInputField("postalCode", e.target.value)}
        />
      </div>
    </div>
  );
};

export default Address;
