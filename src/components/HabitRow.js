import React from 'react'
import HabitSquare from './HabitSquare'

export default function HabitRow(props) {
  if (props.habit){
    return (
      <>
        <div key={props.habit.id} className="habit-name">
          <button onClick={props.deleteHabit} className="delete-button">X</button>
          <div className="habit-name-text">
            {props.habit.name}
          </div>
        </div>
        {[...Array(props.numberOfDays.days)].map((_,index) => 
          <HabitSquare 
            id={props.habit.id}
            date={props.datesDisplayed[index]}
            checkedDates={props.habit.checkedDates}
            key={crypto.randomUUID()}
            toggle={() => props.toggleHabitSquare(props.habit.id, props.datesDisplayed[index])}
          />
        )}
      </>
    )
  }
}