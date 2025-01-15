import { useState } from 'react'

function App() {

  const [events, setEvents] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])

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
      <div className='flex h-[80svh] m-10'>
        <div className='w-full h-full grid grid-cols-5 grid-rows-12 border-2'>
          {events.map((events, index)=>{
            return(
              <div key={index} className='flex w-full h-full border-y border-y-stone-900 border-x justify-center items-center'>{events}</div>
            )
          })}
        </div>
      </div>

    </>
  )
}

export default App
