import { useEffect, useState } from 'react'
import CalendarGrid from './CalendarGrid'

function App() {

  const [gridTemp, setGridTemp] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [events, setEvents] = useState([])
  const [addingEvent, setAddingEvent] = useState(false)
  const [viewingEvent, setViewingEvent] = useState(false)
  const [startTimeValue, setStartTimeValue] = useState(8)
  const [endTimeValue, setEndTimeValue] = useState(20)
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [day, setDay] = useState(1)
  const [colorOne, setColorOne] = useState("#1520A6")
  const [colorTwo, setColorTwo] = useState("#750288")
  const [deletingEvent, setDeletingEvent] = useState(false)
  const [week, setWeek] = useState(1)
  const [date, setDate] = useState("")
  const [year, setYear] = useState(new Date().getFullYear())
  const [datesForWeek, setDatesForWeek] = useState(['','','','',''])
  const [isDragging, setIsDragging] = useState(false)

  useEffect(()=>{
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    const week = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
    setWeek(week)
  },[])

  useEffect(()=>{
    const mondayDay = WeekToDate(year, week)
    
    const mondayDate = new Date(mondayDay)
    const tuesdayDate = new Date(mondayDate.getTime() + (24 * 60 * 60 * 1000))
    const wednesdayDate = new Date(mondayDate.getTime() + (24 * 60 * 60 * 1000)*2)
    const thursdayDate = new Date(mondayDate.getTime() + (24 * 60 * 60 * 1000)*3)
    const fridayDate = new Date(mondayDate.getTime() + (24 * 60 * 60 * 1000)*4)

    setDatesForWeek([mondayDate.toDateString(), tuesdayDate.toDateString(), wednesdayDate.toDateString(), thursdayDate.toDateString(), fridayDate.toDateString()])
  },[week])

  const addEvent = (name, start, end, day, description) =>{
    setEvents([...events, {name: name, start: start, end: end, day: day, description: description, colorOne: colorOne, colorTwo: colorTwo, week: week, year: year, date: date}])
    console.log(events)
  }

  const handleStartTimeSlider = (e) =>{
    setStartTimeValue(e.target.value)
  }

  const handleEndTimeSlider = (e) =>{
    setEndTimeValue(e.target.value)
  }

  const handleDescription = (e) =>{
    setDescription(e.target.value)
  }

  const handleTitle = (e) =>{
    setTitle(e.target.value)
  }

  const handleDay = (e) =>{
    setDay(e.target.value)
  }  

  function WeekToDate(year, week) {
    let d = new Date(year, 0, 4);
    d.setDate(d.getDate() - (d.getDay() || 7) + 1 + (week - 1) * 7);
    return d;
  }

  const handleWeekChange = (value) =>{
    if(week+value < 1){
      setWeek(52)
      setYear(year-1)
      return
    }else if(week+value > 52){
      setWeek(1)
      setYear(year+1)
      return
    }
    setWeek(week+value)
  }

  const handleAdd = () =>{
    addEvent(title, startTimeValue, endTimeValue, day, description, colorOne, colorTwo)
    setAddingEvent(false)
    setDescription('')
    setTitle('')
    setStartTimeValue(8)
    setEndTimeValue(20)
    setDay(1)
    setColorOne("#1520A6")
    setColorTwo("#750288")
  }

  const handleView = (title, startTimeValue, endTimeValue, day, description, date) =>{
    if(deletingEvent === true){
      setEvents(events.filter((event) => event.name !== title))
      setDeletingEvent(false)
      setViewingEvent(false)
      return
    }
    setTitle(title)
    setDay(day)
    setStartTimeValue(startTimeValue)
    setEndTimeValue(endTimeValue)
    setDescription(description)
    setDate(date)
    setViewingEvent(true)
  }

  const handleExit = () =>{
    setViewingEvent(false)
    setAddingEvent(false)
    setDescription('')
    setTitle('')
    setStartTimeValue(8)
    setEndTimeValue(20)
    setDay(1)
  }

  const handleDragStart = (e) =>{
    const div = document.getElementById('division')
    setIsDragging(true)
    const mouseX = e.pageX - e.target.offsetLeft
    const mouseY = e.pageY - e.target.offsetTop
    if(e.target.id === 'division' || e.target.id === 'draggable'){
      setDeletingEvent(false)
      setStartTimeValue(Math.round(mouseY/(div.offsetHeight/12)/0.5)*0.5+8)
      setDay(Math.round(mouseX/(div.offsetWidth/5)+0.5))
    }
  }

  const handleDragAnimation = (e) =>{
    const div = document.getElementById('division')
    const draggable = document.getElementById('draggable')
    const mouseX = e.pageX - e.target.offsetLeft
    const mouseY = e.pageY - e.target.offsetTop
    if(isDragging && e.target.id === 'division'){
      draggable.className = `absolute pointer-events-none w-1/5 border-2 h-[calc(8.33%_*_${Math.round(mouseY/(div.offsetHeight/12)/0.5)*0.5 - (startTimeValue-8)})] left-[calc(20%_*_${day-1})] top-[calc(8.36%_*_${startTimeValue-8})] bg-white rounded-lg opacity-30 -z-50`
    }
    else if(e.target.id === 'division'){
      draggable.className = `absolute pointer-events-none w-1/5 border-2 h-[calc(8.33%_*_0.5)] left-[calc(20%_*_${Math.round(mouseX/(div.offsetWidth/5)+0.5)-1})] top-[calc(8.36%_*_${Math.round(mouseY/(div.offsetHeight/12)/0.5-0.5)*0.5})] rounded-lg bg-white opacity-30 -z-50`
    }else{
      draggable.className = `hidden`
    }
  }

  const handleLeave = (e) =>{
    const draggable = document.getElementById('draggable')
    draggable.className = `hidden`
  }

  const handleDragEnd = (e) =>{
    const div = document.getElementById('division')
    setIsDragging(false)
    const mouseY = e.pageY - e.target.offsetTop
    if(e.target.id === 'division' || e.target.id === 'draggable'){
      setEndTimeValue(Math.round(mouseY/(div.offsetHeight/12)/0.5)*0.5+8)
      setDate(datesForWeek[day-1])
      setAddingEvent(true)
    }
  }

  const handleColorOne = (e) =>{
    setColorOne(e.target.value)
  }

  const handleColorTwo = (e) =>{
    setColorTwo(e.target.value)
  }


  return (
    <>
      <header className='h-24 border-b-2 items-center'>
        <div className='h-full mx-10 flex justify-between items-center'>
          <button>Menu</button>
          <button onClick={()=>setDeletingEvent(true)}>Delete Event</button>
          <input type="text" className='bg-black border-2 border-white rounded-lg w-1/4 text-lg text-center' />
          <button onClick={()=>setAddingEvent(true)}>Add Event</button>
          <button>Profile</button>
        </div>
      </header>
      <div className='flex flex-col w-full h-full'>
        <div className='flex flex-row justify-between m-2'>
          <button onClick={()=>handleWeekChange(-1)}>Previous Week</button>
          <p>{datesForWeek[0].split(" ").splice(1).join(" ")} - {datesForWeek[4].split(" ").splice(1).join(" ")}</p>
          <button onClick={()=>handleWeekChange(1)}>Next Week</button>
        </div>
        <div className='flex flex-row w-full h-full'>
          <div className='ml-2 mt-5 text-center flex flex-col justify-between'>
              <p>8:00</p>
              <p>9:00</p>
              <p>10:00</p>
              <p>11:00</p>
              <p>12:00</p>
              <p>13:00</p>
              <p>14:00</p>
              <p>15:00</p>
              <p>16:00</p>
              <p>17:00</p>
              <p>18:00</p>
              <p>19:00</p>
              <p>20:00</p>
          </div>
          <div className='flex flex-col w-full h-[80svh] ml-2 mr-10'>
            <div className="flex justify-evenly w-full">
              <div className='flex flex-row justify-evenly w-full'>
                <p className='text-start'>{datesForWeek[0].split(" ")[2]}</p>
                <h1 className='text-xl w-full text-center'>Monday</h1>
              </div>
              <div className='flex flex-row justify-evenly w-full'>
                <p className='text-start'>{datesForWeek[1].split(" ")[2]}</p>
                <h1 className='text-xl w-full text-center'>Tuesday</h1>
              </div>
              <div className='flex flex-row justify-evenly w-full'>
                <p className='text-start'>{datesForWeek[2].split(" ")[2]}</p>
                <h1 className='text-xl w-full text-center'>Wednesday</h1>
              </div>
              <div className='flex flex-row justify-evenly w-full'>
                <p className='text-start'>{datesForWeek[3].split(" ")[2]}</p>
                <h1 className='text-xl w-full text-center'>Thursday</h1>
              </div>
              <div className='flex flex-row justify-evenly w-full'>
                <p className='text-start'>{datesForWeek[4].split(" ")[2]}</p>
                <h1 className='text-xl w-full text-center'>Friday</h1>
              </div>
            </div>
            <CalendarGrid gridTemp={gridTemp} events={events} handleView={handleView} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} handleDragAnimation={handleDragAnimation} handleLeave={handleLeave} week={week} year={year}/>
          </div>
        </div>
      </div>
      {viewingEvent && <div className='absolute top-0 left-0 w-full h-full filter backdrop-blur-lg bg-black bg-opacity-30'>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border-2 rounded-xl p-5 w-2/3 h-2/3 backdrop-filter backdrop-blur-lg'>
          <button className='absolute top-2 right-5 text-xl rounded-lg' onClick={handleExit}>X</button>
          <h1 className='absolute left-5 top-2 text-xl'>{date.split(" ").splice(1).join(" ")}</h1>
          <div className='flex flex-col justify-between w-full h-full '>
            <h1 className='text-center text-2xl'>{title}</h1>
            <p className='text-center text-lg'>{description}</p>
            <div className='flex flex-row justify-between w-full'>
              <p className='text-xl'>{startTimeValue<Math.round(startTimeValue)?`${Math.round(startTimeValue-0.1)}:30`:`${startTimeValue}:00`} START</p>
              <p className='text-xl'>END {endTimeValue<Math.round(endTimeValue)?`${Math.round(endTimeValue-0.1)}:30`:`${endTimeValue}:00`}</p>
            </div>
          </div>
        </div>
      </div>}
      {addingEvent && 
      <div className='absolute top-0 left-0 w-full h-full filter backdrop-blur-lg bg-black bg-opacity-30'>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border-2 rounded-xl p-5 w-2/3 h-2/3 backdrop-filter backdrop-blur-lg'>
          <button className='absolute top-2 right-5 text-xl rounded-lg border2' onClick={handleExit}>X</button>
          <div className='flex flex-col justify-between w-full h-full '>
            <div className='flex justify-center w-full'>
              <input type="text" placeholder='Title' maxLength={20} onChange={handleTitle} className='w-1/2 text-lg bg-black text-white border-2 rounded-xl text-center' />
            </div>
            <div className='flex flex-col justify-center w-full'>
              <p className='text-center'>{startTimeValue}</p>
              <input type="range" min={8} max={20} step={0.5} onChange={handleStartTimeSlider} />
            </div>
            <div className='flex flex-col justify-center w-full'>
              <p className='text-center'>{endTimeValue}</p>
              <input type="range" min={8} max={20} step={0.5} onChange={handleEndTimeSlider} />
            </div>
            <div className='flex flex-col justify-center w-full'>
              <p className='text-center'>{day}</p>
              <input type="range" max={5} min={1} step={1} onChange={handleDay} className='w-1/2 self-center' />
            </div>
            <div className='flex flex-col justify-center w-full'>
              <textarea name="description" id="1" onChange={handleDescription} placeholder='Description' className='text-center self-center bg-black text-white border-2 rounded-xl h-full w-2/3'></textarea>
            </div>
            <div className='flex justify-center w-full'>
              <input type="color" onChange={handleColorOne} defaultValue={"#1520A6"}/>
              <input type="color" onChange={handleColorTwo} defaultValue={"#750288"}/>
            </div>
            <div className='flex justify-center w-full'>
              <button className='text-center border-2 rounded-lg w-24 h-10' onClick={handleAdd}>Add</button>
            </div>
            
          </div>
        </div>
      </div>}

    </>
  )
}

export default App
