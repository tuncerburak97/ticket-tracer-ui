// src/App.js
import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import TrainListPage from "./pages/TrainListPage";

const App = () => {
  const [trainData, setTrainData] = useState(null);

  const handleSearch = (data) => {
    setTrainData(data);
  };

  const handleBack = () => {
    setTrainData(null);
  };

  return (
    <div className="App">
      {trainData ? (
        <TrainListPage trainData={trainData} onBack={handleBack} />
      ) : (
        <HomePage onSearch={handleSearch} />
      )}
    </div>
  );
};

export default App;
