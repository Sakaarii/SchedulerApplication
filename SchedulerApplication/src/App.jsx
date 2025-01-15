import { useState } from 'react'
import CalendarGrid from './CalendarGrid'

function App() {

  const [gridTemp, setGridTemp] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [events, setEvents] = useState([{name: "School Work", start: 15, end: 20, day:5}, {name: "Make Food", start: 15, end: 16, day:4}, {name: "Go To Store", start: 16, end: 17, day:3}])

  return (
    <>
      <header className='h-24 border-b-2 items-center'>
        <div className='h-full mx-10 flex justify-between items-center'>
          <button>Menu</button>
          <button>Delete Event</button>
          <input type="text" className='bg-black border-2 border-white rounded-lg w-1/4 text-lg text-center' />
          <button>Add Event</button>
          <button>Profile</button>
        </div>
      </header>
      <div className='flex flex-row w-full h-full'>
        <div className='ml-2 mt-14 text-center flex flex-col justify-between'>
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
        <div className='flex flex-col w-full h-[80svh] mt-10 ml-2 mr-20'>
          <div className="flex justify-between mx-36">
            <h1 className='text-xl'>Monday</h1>
            <h1 className='text-xl'>Tuesday</h1>
            <h1 className='text-xl'>Wednesday</h1>
            <h1 className='text-xl'>Thursday</h1>
            <h1 className='text-xl'>Friday</h1>
          </div>
          <CalendarGrid gridTemp={gridTemp} events={events}/>
        </div>
      </div>

    </>
  )
}

export default App
