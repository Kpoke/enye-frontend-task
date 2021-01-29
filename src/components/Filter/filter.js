import React, { useState, useEffect } from "react";

import "./filter.css";

const Filter = ({ profiles, setProfiles }) => {
  const [gender, setGender] = useState("");
  const [method, setMethod] = useState("");

  useEffect(() => {
    if (gender === "" && method === "") {
      setProfiles(profiles);
    } else {
      const newProfiles = profiles.filter((profile) => {
        let boolean = false;
        if (gender !== "") {
          if (profile.Gender.toLowerCase() === gender.toLowerCase()) {
            boolean = true;
          }
        }
        if (method !== "") {
          if (profile.PaymentMethod.toLowerCase() === method.toLowerCase()) {
            boolean = true;
          }
        }

        if (gender !== "" && method !== "") {
          return (
            profile.Gender.toLowerCase() === gender.toLowerCase() &&
            profile.PaymentMethod.toLowerCase() === method.toLowerCase()
          );
        }

        return boolean;
      });
      setProfiles(newProfiles);
    }
  }, [profiles, gender, method, setProfiles]);

  return (
    <div className="FilterContainer">
      <div className="Select__Option">
        <label className="Label">Gender</label>
        <select
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer to skip">Prefer To Skip</option>
          <option value="">-</option>
        </select>
      </div>
      <div className="Select__Option">
        <label className="Label">Payment Method</label>
        <select
          value={method}
          onChange={(event) => setMethod(event.target.value)}
        >
          <option value="money order">Money Order</option>
          <option value="paypal">Paypal</option>
          <option value="check">Check</option>
          <option value="cc">CC</option>
          <option value="">-</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
