// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import tr from "date-fns/locale/tr";
import { API_URL_LOAD, API_URL_QUERY } from "../constants/api";
import LoadingBar from "../components/LoadingBar";
import "./HomePage.css";

registerLocale("tr", tr);

const HomePage = ({ onSearch }) => {
  const [stations, setStations] = useState([]);
  const [fromStation, setFromStation] = useState("");
  const [toStations, setToStations] = useState([]);
  const [toStation, setToStation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL_LOAD)
      .then((response) => {
        setStations(response.data.response);
      })
      .catch((error) => {
        console.error("API çağrısı sırasında bir hata oluştu:", error);
      });
  }, []);

  const handleFromStationChange = (event) => {
    const selectedStation = stations.find(
      (station) => station.stationName === event.target.value
    );
    setFromStation(event.target.value);
    setToStations(selectedStation ? selectedStation.toStationList : []);
    setToStation("");
  };

  const handleToStationChange = (event) => {
    setToStation(event.target.value);
  };

  const handleSubmit = () => {
    if (!fromStation || !toStation || !selectedDate) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const selectedFromStation = stations.find(
      (station) => station.stationName === fromStation
    );
    const selectedToStation = selectedFromStation.toStationList.find(
      (station) => station.toStationName === toStation
    );

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${months[selectedDate.getMonth()]} ${(
      "0" + selectedDate.getDate()
    ).slice(-2)}, ${selectedDate.getFullYear()} 00:00:00 AM`;

    const requestBody = {
      gidisTarih: formattedDate,
      binisIstasyonId: selectedFromStation.stationID,
      inisIstasyonId: selectedToStation.toStationId,
      binisIstasyon: selectedFromStation.stationName,
      inisIstasyonu: selectedToStation.toStationName,
    };

    setLoading(true); // Yükleme başladığında loading'i true yap
    axios
      .post(API_URL_QUERY, requestBody)
      .then((response) => {
        setLoading(false); // Yükleme tamamlandığında loading'i false yap
        onSearch(response.data); // onSearch fonksiyonunu çağırarak trainData'yı App bileşenine gönderiyoruz
      })
      .catch((error) => {
        console.error("Sorgu sırasında bir hata oluştu:", error);
        setLoading(false); // Hata durumunda da loading'i false yap
      });
  };

  return (
    <div className="page-container">
      <div className="container">
        {loading && <LoadingBar />}
        <h1>Tren Bileti Sorgulama</h1>
        <div className="form-group">
          <label>Gidiş Yeri</label>
          <select value={fromStation} onChange={handleFromStationChange}>
            <option value="">Gidiş yerini seçin</option>
            {stations.map((station) => (
              <option key={station.stationID} value={station.stationName}>
                {station.stationViewName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Varış Yeri</label>
          <select
            value={toStation}
            onChange={handleToStationChange}
            disabled={!fromStation}
          >
            <option value="">Varış yerini seçin</option>
            {Array.isArray(toStations) &&
              toStations.map((station) => (
                <option key={station.toStationId} value={station.toStationName}>
                  {station.toStationName}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>Gidiş Tarihi</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
            locale="tr"
            calendarStartDay={1} // Pazartesi gününü haftanın ilk günü olarak ayarla
          />
        </div>
        <button onClick={handleSubmit} className="btn-submit">
          Sorgula
        </button>
      </div>
    </div>
  );
};

export default HomePage;
