// src/components/SuccessMessage.js
import React from "react";
import "./SuccessMessage.css";

const SuccessMessage = ({ onClose }) => {
  return (
    <div className="success-message">
      <h2>Talebiniz başarı ile alındı</h2>
      <p>
        Uygun yer bulunması durumunda mail adresinize bilgilendirme
        yapılacaktır.
      </p>
      <button onClick={onClose} className="btn-close">
        Tamam
      </button>
    </div>
  );
};

export default SuccessMessage;
