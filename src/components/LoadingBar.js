// src/components/LoadingBar.js
import React from "react";
import "./LoadingBar.css";

const LoadingBar = () => (
  <div className="loading-bar">
    <div className="loading-spinner"></div>
    <p>Yükleniyor...</p>
  </div>
);

export default LoadingBar;
