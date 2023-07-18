import React from 'react'
import './component_styles/Header.css'
import { sub } from 'date-fns'

export default function Header(props) {

  return (
    <div className="header">
      <h1>Habit Tracker</h1>
      <div className="date-buttons-container">
        {props.startDate < sub(new Date(), {days: 1}) &&
          <button onClick={props.add} className="change-date-button">{"<"}</button>
        }
        <button onClick={props.subtract} className="change-date-button">{">"}</button>
      </div>
    </div>
  )
}