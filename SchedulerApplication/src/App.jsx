import { useEffect, useState } from 'react'
import CalendarGrid from './CalendarGrid'
// import {getUserData, addUser, addEventDatabase, deleteEvent} from "./data"

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
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')

  const [menuClicked, setMenuClicked] = useState(false)
  const [profileClicked, setProfileClicked] = useState(false)

  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)

  // login
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  // useEffect(()=>{
  //   const newData = data.find((data) => data.user === user && data.password === password)
  //   if(newData){
  //     setEvents(newData.events)
  //   }},[loggedIn])

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
      var date = new Date();
      setCurrentDate(date.toDateString())
      setCurrentTime(date.getHours() + ":" + date.getMinutes())
    const interval = setInterval(() => {
      var date = new Date();
      setCurrentDate(date.toDateString())
      setCurrentTime(date.getHours() + ":" + date.getMinutes())
    }, 60000);

    return () => clearInterval(interval);
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
    const newEvent = {name: name, start: start, end: end, day: day, description: description, colorOne: colorOne, colorTwo: colorTwo, week: week, year: year, date: date}
    // FOR BACKEND
    // if(user !== "" && password !== ""){
    //   addEventDatabase(user, password, name, start, end, day, description, date, week, year, colorOne, colorTwo).then((data)=>{
    //     console.log("Add Event Data:", data)
    //     if(data){
    //       setEvents([...events, newEvent])
    //     }else{
    //       console.log("Failed to add event")
    //     }
    //   })
    // }else{
    //   setEvents([...events, newEvent])
    // }
    setEvents([...events, newEvent])
  }

  const handleDescription = (e) =>{
    setDescription(e.target.value)
  }

  const handleTitle = (e) =>{
    setTitle(e.target.value)
  }

  const handleDay = (e) =>{
    setDay(e.target.value)
    setDate(datesForWeek[e.target.value-1])
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
    setMenuClicked(false)
    setProfileClicked(false)
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

  const handleStartTimeInput = () =>{
    const startTime = document.getElementById('startTime')
    if(startTime.className === 'hidden'){
      startTime.className = 'text-white bg-black border-2 rounded-xl self-center text-center w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
    }else{
      startTime.className = 'hidden'
    }
  }
  
  const handleEndTimeInput = () =>{
    const endTime = document.getElementById('endTime')
    if(endTime.className === 'hidden'){
      endTime.className = 'text-white bg-black border-2 rounded-xl self-center text-center w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
    }else{
      endTime.className = 'hidden'
    }
  }

  const handleDateInput = () =>{
    const dateInput = document.getElementById('dateInput')
    if(dateInput.className === 'hidden'){
      dateInput.className = 'text-white bg-black border-2 rounded-xl self-center text-center w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
    }else{
      dateInput.className = 'hidden'
    }
  }

  const handleStartTimeInputChange = (e) =>{
    setStartTimeValue(e.target.value)
  }

  const handleEndTimeInputChange = (e) =>{
    setEndTimeValue(e.target.value)
  }

  const handleSearch = (e) =>{
    if(e.target.value === ''){
      setSearching(false)
      setSearch(e.target.value)
    }else{
      setSearching(true)
      setSearch(e.target.value)
    }
  }

  const handleSearchClick = (week) =>{
    setWeek(week)
    setSearching(false)
    setSearch('')
  }

  const handleLogin = () =>{
    // FOR BACKEND
    // getUserData(user, password).then((data)=>{
    //   console.log("Login Data:", data)
    //   if(data){
    //     setEvents(data.events)
    //     setLoggedIn(true)
    //     setProfileClicked(false)
    //   }else{
    //     addUser(user, password).then((data)=>{
    //       if(data){
    //         setEvents(data.events)
    //         setLoggedIn(true)
    //         setProfileClicked(false)
    //       }
    //     })
    //   }
    // })
  }


  return (
    <>
      <header className='h-24 border-b-2 items-center z-100'>
        <div className='h-full mx-10 flex justify-between items-center'>
          <button onClick={()=>setMenuClicked(!menuClicked)} className={`p-2 rounded-lg hover:bg-gray-900 ${menuClicked?"bg-gray-900":""}`}>Menu</button>
          <button onClick={()=>setDeletingEvent(!deletingEvent)} className={`p-2 rounded-lg hover:bg-rose-500 ${deletingEvent?"bg-rose-500":""}`}>Delete Event</button>
          <input type="text" value={search} onChange={handleSearch} className='bg-black border-2 border-white rounded-lg w-1/4 text-lg text-center z-51' />
          <button onClick={()=>setAddingEvent(true)} className={`p-2 rounded-lg hover:bg-green-500 ${addingEvent?"bg-green-500":""}`}>Add Event</button>
          <button onClick={()=>setProfileClicked(!profileClicked)} className={`p-2 rounded-lg hover:bg-gray-900 ${profileClicked?"bg-gray-900":""}`}>Profile</button>
          {searching && <div className='absolute top-24 left-0 w-full h-full filter backdrop-blur-lg bg-black bg-opacity-30 z-50'>
            {events.filter(e => e.name.toLowerCase().includes(search.toLowerCase())).map((e, index)=>{
              return(
                <div className='flex flex-row justify-center w-full'>
                  <button key={index} onClick={()=>handleSearchClick(e.week)} className='flex flex-row justify-between w-1/4 bg-black h-fit p-2 border-2 rounded-lg m-2 border-white'>
                    <p>{e.name}</p>
                    <p>{e.date.split(" ").splice(1).join(" ")}</p>
                  </button>
                </div>
              )
            })}
          </div>}
        </div>
      </header>
      <div className='flex flex-col w-full h-full'>
        {menuClicked && <div className='absolute top-24 left-0 w-1/4 h-1/4 z-50 bg-black border-r border-b border-white'></div>}
        {profileClicked && <div className='absolute top-24 right-0 w-1/4 h-1/4 z-50 bg-black border-l border-b border-white'>
          <div className='flex flex-col justify-between w-full h-full p-2'>
            <h1 className='text-center text-xl h-1/3'>{!loggedIn?"Not Logged In":user}</h1>
            <div className='h-2/3 flex flex-col justify-between'>
              <input type="text" placeholder='Username' onChange={(e)=>setUser(e.target.value)} className='w-full h-full my-2 bg-black text-center border-2 rounded-lg'/>
              <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className='w-full h-full my-2 bg-black text-center border-2 rounded-lg'/>
              <button onClick={handleLogin} className='text-center text-xl w-full p-2 rounded-lg hover:bg-gray-900'>Login</button>
            </div>
          </div>
        </div>}
        <div className='flex flex-row justify-between m-2'>
          <button onClick={()=>handleWeekChange(-1)}>Previous Week</button>
          <p>{datesForWeek[0].split(" ").splice(1).join(" ")} - {datesForWeek[4].split(" ").splice(1).join(" ")}</p>
          <button onClick={()=>handleWeekChange(1)}>Next Week</button>
        </div>
        <div className='flex flex-row w-full h-full'>
          <div className='relative ml-2 mt-5 text-center flex flex-col justify-between'>
              <div className={`absolute -right-2 text-2xl bg-rose-500 w-full h-[0.1rem] top-[calc(0.5%_+_((${currentTime.split(":")[0]>7 && currentTime.split(":")[0]<21?currentTime.split(":")[0]:0}_-_8)_/_12_*_100%)_+_(${currentTime.split(":")[1]}_/_60_*_100%_/_12))]`}></div>
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
                <h1 className={datesForWeek[0] === currentDate?"text-xl w-full text-center text-rose-400":"text-xl w-full text-center"}>Monday</h1>
              </div>
              <div className='flex flex-row justify-evenly w-full'>
                <p className='text-start'>{datesForWeek[1].split(" ")[2]}</p>
                <h1 className={datesForWeek[1] === currentDate?"text-xl w-full text-center text-rose-400":"text-xl w-full text-center"}>Tuesday</h1>
              </div>
              <div className='flex flex-row justify-evenly w-full'>
                <p className='text-start'>{datesForWeek[2].split(" ")[2]}</p>
                <h1 className={datesForWeek[2] === currentDate?"text-xl w-full text-center text-rose-400":"text-xl w-full text-center"}>Wednesday</h1>
              </div>
              <div className='flex flex-row justify-evenly w-full'>
                <p className='text-start'>{datesForWeek[3].split(" ")[2]}</p>
                <h1 className={datesForWeek[3] === currentDate?"text-xl w-full text-center text-rose-400":"text-xl w-full text-center"}>Thursday</h1>
              </div>
              <div className='flex flex-row justify-evenly w-full'>
                <p className='text-start'>{datesForWeek[4].split(" ")[2]}</p>
                <h1 className={datesForWeek[4] === currentDate?"text-xl w-full text-center text-rose-400":"text-xl w-full text-center"}>Friday</h1>
              </div>
            </div>
            <CalendarGrid gridTemp={gridTemp} deletingEvent={deletingEvent} events={events} handleView={handleView} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} handleDragAnimation={handleDragAnimation} handleLeave={handleLeave} week={week} year={year}/>
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
            <div className='flex flex-col justify-between w-full'>
              <div className='flex flex-col justify-between w-full'>
                <button className='text-center text-xl w-fit self-center p-1 rounded-xl hover:bg-stone-900' onClick={handleDateInput}>{datesForWeek[day-1]} ⚙</button>
                <input id='dateInput' type="number" defaultValue={day} onChange={handleDay} className='hidden' max={5} min={1} step={1}/>
              </div>
              <div className='flex flex-col justify-between w-full'>
                <button className='text-center text-xl w-fit self-center p-1 rounded-xl hover:bg-stone-900' onClick={handleStartTimeInput}>START {startTimeValue<Math.round(startTimeValue)?`${Math.round(startTimeValue-0.1)}:30`:`${startTimeValue}:00`} ⚙</button>
                <input id='startTime' type="number" defaultValue={startTimeValue} onChange={handleStartTimeInputChange} className='hidden' max={20} min={8} step={0.5}/>
              </div>
              <div className='flex flex-col justify-between w-full'>
                <button className='text-center text-xl w-fit self-center p-1 rounded-xl hover:bg-stone-900' onClick={handleEndTimeInput}>END {endTimeValue<Math.round(endTimeValue)?`${Math.round(endTimeValue-0.1)}:30`:`${endTimeValue}:00`} ⚙</button>
                <input id='endTime' type="number" defaultValue={endTimeValue} onChange={handleEndTimeInputChange} className='hidden' max={20} min={8} step={0.5}/>
              </div>
            </div>
            <div className='flex justify-center w-full'>
              <input type="text" placeholder='Title' maxLength={20} onChange={handleTitle} className='w-1/2 text-lg bg-black text-white border-2 rounded-xl text-center' />
            </div>
            <div className='flex flex-col justify-center h-1/4 w-full'>
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
