import React from 'react'
import './component_styles/HabitForm.css'

export default function HabitForm(props) {

  const [habit, setHabit] = React.useState({name: '', checkedDates: [], id: crypto.randomUUID()})

  function handleChange(event) {
    setHabit(prevHabit => ({
      ...prevHabit, 
      name: event.target.value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    props.addHabit(habit)
  }

  return (
    <div className="habit-form">
      <div className="overlay">
        <div className="habit-form-content">
          <form onSubmit={handleSubmit}>
            <input placeholder="Habit name" 
              type="text"
              value={habit.name}
              onChange={handleChange}
            />
            <button className="add-habit-button" >Add Habit</button>
            <button className="close-button" onClick={props.toggle}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  )

}