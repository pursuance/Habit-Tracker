import React from 'react';
import './style.css';
import Header from './components/Header'
import HabitForm from './components/HabitForm'
import HabitRow from './components/HabitRow'
import { format, add, sub } from 'date-fns'

function removeElement(array, element) {
  const index = array.indexOf(element)
  return array.toSpliced(index, 1)
}

export default function App() {

  function lastNDays(numberOfDays, startDate) {
    return [...Array(numberOfDays)].map((_,index) => {
      const dateObj = new Date()
      dateObj.setDate(startDate.getDate() - index)
      return dateObj.toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"})
    })
  }

  const [numberOfDays, setNumberOfDays] = React.useState({days: 7, startDate: new Date()})

  const [datesDisplayed, setDatesDisplayed] = React.useState()

  React.useEffect(() =>
    setDatesDisplayed(lastNDays(numberOfDays.days, numberOfDays.startDate).map((date,index) => 
    <div key={index} className="date-container">
      <span className="day-of-the-week">{date.split(',')[0]}</span>
      <span className="date-text">{date.split(',')[1].split(' ')[2]}</span>
    </div>
  ))
  , [numberOfDays])

  function changeStartDate(addOrSubtract) {
    if (addOrSubtract === "subtract") {
      setNumberOfDays(prevState => 
        ({
          ...prevState,
          startDate: sub(prevState.startDate, {days: 1})
        })
      )
    }
    if (addOrSubtract === "add") {
      setNumberOfDays(prevState =>
        ({
          ...prevState,
          startDate: add(prevState.startDate, {days: 1})
        })  
      )
    }
  }

  const [habits, setHabits] = React.useState(
    JSON.parse(localStorage.getItem("habits")) || 
  [])
  const [habitRows, setHabitRows] = React.useState([])
  const [showHabitForm, setShowHabitForm] = React.useState(false)
  
  React.useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits))
    setHabitRows(habits.map(habit => 
      <HabitRow 
        habit={habit}
        datesDisplayed = {lastNDays(numberOfDays.days, numberOfDays.startDate)}
        deleteHabit={() => deleteHabit(habit)}
        key={crypto.randomUUID()}
        numberOfDays={numberOfDays}
        toggleHabitSquare={toggleHabitSquare}
      />
    ))
  },[habits, datesDisplayed])

  function toggleHabitForm() {
    setShowHabitForm(prevState => !prevState)
  }

  function addHabit(habit) {
    setHabits(prevHabits => [...prevHabits, habit])
    toggleHabitForm()
  }

  function deleteHabit(habit) {
    setHabits(removeElement(habits,habit))
  }

  function toggleHabitSquare(id, date) {
    setHabits( 
      habits.map(habit => {
        if (habit.id === id && !habit.checkedDates.includes(date)) {
          return {...habit, checkedDates: [...habit.checkedDates, date]}
        }
        else if (habit.id === id && habit.checkedDates.includes(date)) {
          return {...habit, checkedDates: removeElement(habit.checkedDates, date)}
        }
        else {
          return habit
        }
      })  
    )
  }
  
  const habitGridStyle = {
    display: "grid",
    grid: `${String('1fr ').repeat(habits.length + 1)} / 1fr ${String('1fr ').repeat(numberOfDays.days)}`,
  }

  return (
    <>
      <Header add={() => changeStartDate("add")} subtract={() => changeStartDate("subtract")}/>
      <div className="app-container">
          {showHabitForm && 
            <HabitForm 
            toggle={toggleHabitForm}
            addHabit={addHabit}
            />
          }
          <div className="habit-grid" style={habitGridStyle}>
            <div className="form-button-container">
              <button className="open-add-habit-form" onClick={toggleHabitForm}>Add a Habbit</button>
            </div>
            {datesDisplayed}
            {habitRows}
          </div>
        </div>
    </>
  )
}
