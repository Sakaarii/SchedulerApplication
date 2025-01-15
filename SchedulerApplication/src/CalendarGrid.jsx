

function CalendarGrid({gridTemp, events}) {


  return (
    <>
        <div className='w-full h-full grid grid-cols-5 grid-rows-12 border-t-2 border-x-2'>
          {gridTemp.map((events, index)=>{
            return(
              <div key={index} className='flex w-full h-full border-y border-y-stone-900 border-x justify-center items-center'></div>
            )
          })}
          <div className="absolute w-[calc(100svw_-_8.7rem)] h-[calc(79svh_-_1.4rem)] mr-20">
            {events.map((e, index)=>{
                return(
                    <div key={index} className={`absolute h-[calc(8.33%_*_${e.end-e.start})] left-[calc(20%_*_${e.day-1})] top-[calc(8.33%_*_${e.start-8})] w-1/5 bg-gradient-to-b from-blue-800 to-rose-800 bg-repeat rounded-xl border-2 border-white`}>
                        <div className="flex flex-col justify-between h-full">
                            <h1 className="text-center text-lg w-full">{e.name}</h1>
                            <div className="flex justify-between">
                                <h1 className="text-center w-full">{e.start}:00</h1> 
                                <h1 className="text-center w-full">{e.end}:00</h1>
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