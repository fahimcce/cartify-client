"use client";
import React from "react";
import "../../../styles/Ticker.css";

const Ticker = () => {
  return (
    <div className="ticker-container">
      <div className="ticker-content">
        {Array(20)
          .fill(null)
          .map((_, idx) => (
            <React.Fragment key={idx}>
              <span className="ticker-item">
                <span className="star">✺</span> Men
              </span>
              <span className="ticker-item">
                <span className="star">✺</span> Jackets
              </span>
              <span className="ticker-item">
                <span className="star">✺</span> Women
              </span>
              <span className="ticker-item">
                <span className="star">✺</span> Shirts
              </span>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Ticker;
