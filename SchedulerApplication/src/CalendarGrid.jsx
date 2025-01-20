

function CalendarGrid({gridTemp, events, handleView, handleDragStart, handleDragEnd, handleDragAnimation, handleLeave, week, year, deletingEvent}) {


  return (
    <>
        <div className='w-full h-full grid grid-cols-5 grid-rows-12 border-t-2 border-x-2'>
          {gridTemp.map((events, index)=>{
            return(
              <div key={index} className='flex w-full h-full border-y border-y-stone-800 border-x justify-center items-center'></div>
            )
          })}
          <div id="division" onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onMouseLeave={handleLeave} onMouseMove={handleDragAnimation} className="absolute w-[calc(100svw_-_6.1rem)] h-[calc(79svh_-_1.4rem)] mr-10">
            <div id="draggable" className=""></div>
            {events.filter(e => e.week === week && e.year === year).map((e, index)=>{
                return(
                    <div onClick={()=>handleView(e.name, e.start, e.end, e.day, e.description, e.date)} key={index} className={`absolute h-[calc(8.36%_*_${e.end-e.start})] left-[calc(20%_*_${e.day-1})] top-[calc(8.33%_*_${e.start-8})] w-1/5 bg-gradient-to-b from-[${e.colorOne}] to-[${e.colorTwo}] bg-repeat rounded-xl border-2 border-white ${deletingEvent?"hover:border-rose-500 hover:border-4 cursor-not-allowed":"hover:border-4 cursor-pointer"}`}>
                        <div className="flex flex-col justify-between h-full">
                            <h1 className="text-center text-lg w-full">{e.name}</h1>
                            <div className="flex overflow-hidden justify-between">
                                <h1 className="text-center w-full">{e.start<Math.round(e.start)?`${Math.round(e.start-0.1)}:30`:`${e.start}:00`}</h1> 
                                <h1 className="text-center w-full">{e.end<Math.round(e.end)?`${Math.round(e.end-0.1)}:30`:`${e.end}:00`}</h1>
                            </div>
                        </div>
                    </div>  
                )
            })}
          </div>
        </div>
    </>
  )
}

export default CalendarGrid