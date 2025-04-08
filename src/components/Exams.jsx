import React from 'react'

const Exams = (props) => {
  return (
    
    <>
        <div className='flex justify-center items-center border border-black/35 max-w-80 min-w-79 shadow-xl p-4 rounded-xl gap-4 hover:scale-103 transition duration-180 cursor-pointer'>

                <img class="w-[55px] object-cover" src={props.url} alt="JEE Main"></img>
                <div>
                    <h1 className='font-medium'>{props.name}</h1>
                    <p className='text-xs font-medium text-black/70'>Previous Year Questions with Solutions</p>
                </div>
            
        </div>

    </>

  )
}

export default Exams