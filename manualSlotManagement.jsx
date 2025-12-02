import React, { useState } from "react";
import "./manualSlotManagement.css"; // Import the CSS file for styling

const ManualSlotManagement = () => {
  const [selectedDate, setSelectedDate] = useState(23); // Default to 23
  const [selectedTimeFormat, setSelectedTimeFormat] = useState("12h");

  const dates = Array.from({ length: 31 }, (_, i) => i + 1); // 1 to 31 for July
  const availableTimes = [
    "10:00 AM",
    "11:00 AM",
    "12:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
  ];

  const bookedTimes = ["10:00 AM", "1:30 PM", "2:00 PM"]; // Example booked times

  return (
    <div className="manual-slot-management-container">
      <div className="sidebar">
        <div className="back-button">
          <span className="arrow-icon">{"<"}</span> Back
        </div>
        <div className="venue-info">
          <div className="venue-logo">
            <img src="https://via.placeholder.com/60" alt="HL City Logo" />{" "}
            {/* Replace with your actual logo */}
          </div>
          <div className="venue-details">
            <h2>NEXUS SPORTS ARENA</h2>
            <p className="address">
              GM Balan Nagar, Near Bommanaickenpalayam High School,
              Nerupperichal, Tiruppur, Tamil Nadu
            </p>
            <div className="info-item">
              <span className="icon">🕒</span> 1 hour
            </div>
            <div className="info-item">
              <span className="icon">📍</span> Tiruppur
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Select a Date & Time</h1>
          <div className="timezone-selector">
            <select>
              <option>GMT+05:30</option>
            </select>
            <select>
              <option>60m</option>
            </select>
          </div>
          <div className="date-format-selector">
            <span>Jul 23, 2025</span>
            <button
              className={selectedTimeFormat === "12h" ? "active" : ""}
              onClick={() => setSelectedTimeFormat("12h")}
            >
              12h
            </button>
            <button
              className={selectedTimeFormat === "24h" ? "active" : ""}
              onClick={() => setSelectedTimeFormat("24h")}
            >
              24h
            </button>
          </div>
        </div>

        <div className="calendar-and-slots">
          <div className="calendar-section">
            <div className="calendar-nav">
              <span className="arrow-icon">{"<"}</span>
              <h2>November 2025</h2>
              <span className="arrow-icon">{">"}</span>
            </div>
            <div className="calendar-grid">
              <div className="day-labels">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>
              <div className="dates-grid">
                {/* Placeholder for leading blank days if July 1st isn't Sunday */}
                {Array.from({ length: 3 }, (_, i) => (
                  <span key={`blank-${i}`} className="empty-day"></span>
                ))}
                {dates.map((date) => (
                  <span
                    key={date}
                    className={`date-cell ${
                      date === selectedDate ? "selected" : ""
                    } ${date >= 23 && date <= 25 || date >=28 && date <=31 ? "available-range" : ""}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {date}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="time-slots-section">
            {availableTimes.map((time) => (
              <div
                key={time}
                className={`time-slot ${
                  bookedTimes.includes(time) ? "booked" : "available"
                }`}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualSlotManagement;