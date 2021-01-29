import React, { useState, useEffect } from "react";

import "./footer.css";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Footer = ({ totalProfiles, size, setFunction }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(size / 20);
  const pages = range(1, totalPages);

  useEffect(() => {
    const upperLimit = currentPage * 20;
    const dataSlice = totalProfiles.slice(upperLimit - 20, upperLimit);
    setFunction(dataSlice);
  }, [currentPage, setFunction, totalProfiles]);

  const goto = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="pageContainer">
        {pages.map((page, index) => (
          <div key={index}>
            <div
              className={`button ${page === currentPage ? "active" : ""}`}
              onClick={() => goto(page)}
            >
              {page}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
