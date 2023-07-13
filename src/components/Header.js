import React from 'react'
import './component_styles/Header.css'

export default function Header(props) {
  return (
    <div className="header">
      <h1>Habit Tracker</h1>
      <div className="date-buttons-container">
        <button onClick={props.add} className="change-date-button">{"<"}</button>
        <button onClick={props.subtract} className="change-date-button">{">"}</button>
      </div>
    </div>
  )
}