import React from 'react'

export default function HabitSquare(props) {
  const checkedStyle = {
    backgroundColor: "#61DAFB"
  }

  return (
    <div className="habit-square-container">
      <div 
        className="habit-square" 
        id={props.id}
        style={props.checkedDates.includes(props.date) ? checkedStyle : undefined}
        onClick={props.toggle}
      >
      </div>
    </div>
  )
}