// src/pages/TrainListPage.js
import React, { useState } from "react";
import axios from "axios";
import TrainDetails from "../components/TrainDetails";
import SuccessMessage from "../components/SuccessMessage";
import "./TrainListPage.css";
import { API_URL_ADD } from "../constants/api";

const TrainListPage = ({ trainData, onBack }) => {
  const [selectedTrains, setSelectedTrains] = useState([]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSelectTrain = (train) => {
    if (
      selectedTrains.some(
        (selectedTrain) => selectedTrain.trainID === train.trainID
      )
    ) {
      setSelectedTrains(
        selectedTrains.filter(
          (selectedTrain) => selectedTrain.trainID !== train.trainID
        )
      );
    } else {
      if (selectedTrains.length < 3) {
        setSelectedTrains([...selectedTrains, train]);
      } else {
        alert("En fazla 3 sefer seçebilirsiniz.");
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Geçerli bir email adresi girin.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleAddButtonClick = () => {
    if (handleEmailValidation()) {
      const requestPayload = selectedTrains.map((train) => ({
        trainID: train.trainID,
        tourID: train.tourID,
        gidisTarih: train.departureDate,
        inisTarih: train.arrivalDate,
        binisIstasyon: train.departureStation,
        inisIstasyonu: train.arrivalStation,
        email,
        binisIstasyonId: train.departureStationID,
        inisIstasyonId: train.arrivalStationID,
      }));

      axios
        .post(API_URL_ADD, {
          request: requestPayload,
        })
        .then((response) => {
          setShowSuccessMessage(true);
        })
        .catch((error) => {
          console.error("Ekleme sırasında bir hata oluştu:", error);
          alert("Ekleme sırasında bir hata oluştu.");
        });
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessMessage(false);
    onBack();
  };

  return (
    <div className="page-container">
      <div className="train-list-page">
        <h1>Tren Seferleri</h1>
        <div className="train-list">
          {trainData && trainData.details ? (
            trainData.details.map((train) => (
              <TrainDetails
                key={train.trainID}
                train={train}
                onSelect={handleSelectTrain}
                isSelected={selectedTrains.some(
                  (selectedTrain) => selectedTrain.trainID === train.trainID
                )}
              />
            ))
          ) : (
            <p>Tren seferleri yüklenemedi.</p>
          )}
        </div>
        <div className="email-input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailValidation}
          />
          {emailError && <small style={{ color: "red" }}>{emailError}</small>}
        </div>
        <button onClick={handleAddButtonClick} className="btn-add">
          Ekle
        </button>
        <button onClick={onBack} className="btn-back">
          Geri
        </button>
        {showSuccessMessage && <SuccessMessage onClose={handleSuccessClose} />}
      </div>
    </div>
  );
};

export default TrainListPage;
