// src/components/LoadingBar.js
import React from "react";
import "./LoadingBar.css";

const LoadingBar = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-message">Lütfen bekleyiniz...</div>
    </div>
  );
};

export default LoadingBar;
