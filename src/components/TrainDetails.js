// src/components/TrainDetails.js
import React from "react";
import "./TrainDetails.css";

const formatDate = (dateString) => {
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", options).replace(",", "");
};

const TrainDetails = ({ train, onSelect, isSelected }) => {
  const isSelectable = train.emptyPlace.normalPeopleEmptyPlaceCount == 0;

  return (
    <div
      className={`train-details ${
        isSelectable ? "selectable" : "unselectable"
      } ${isSelected ? "selected" : ""}`}
      onClick={() => isSelectable && onSelect(train)}
    >
      <h2>
        {train.departureStation} - {train.arrivalStation}
      </h2>
      <p>
        {formatDate(train.departureDate)} - {formatDate(train.arrivalDate)}
      </p>
      <div className="empty-place-info">
        <p>Toplam Boş Koltuk Sayısı: {train.emptyPlace.totalEmptyPlaceCount}</p>
        <p>Engelli Boş Koltuk Sayısı: {train.emptyPlace.disabledPlaceCount}</p>
        <p>
          Normal Boş Koltuk Sayısı:{" "}
          {train.emptyPlace.normalPeopleEmptyPlaceCount}
        </p>
      </div>
    </div>
  );
};

export default TrainDetails;
