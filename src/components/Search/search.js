import React, { useState, useEffect, useRef } from "react";

import "./search.css";

const Header = ({ profiles, setProfiles }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (searchTerm !== "") {
      const timer = setTimeout(() => {
        if (searchTerm === inputRef.current.value) {
          const newProfiles = profiles.filter((profile) => {
            if (
              profile.FirstName.toLowerCase().includes(
                searchTerm.toLowerCase()
              ) ||
              profile.LastName.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return true;
            }
            return false;
          });
          setProfiles(newProfiles);
        }
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    } else {
      setProfiles(profiles);
    }
  }, [inputRef, profiles, searchTerm, setProfiles]);
  return (
    <div className="HeaderContainer">
      <label className="Label">Search for Name</label>
      <input
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="InputElement"
        ref={inputRef}
      />
    </div>
  );
};

export default Header;
