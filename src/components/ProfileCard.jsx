import React from 'react'

const ProfileCard = () => {
  return (
    
    <>
        <div className='w-70 h-120 bg-zinc-900  rounded-xl p-4'>

            <div className='flex items-center justify-between p-2 my-5'>
                <img className='w-25 h-25 bg-blue-500/10 border border-blue-300 rounded-xl'></img>
                <div>
                    <h1 className='text-white'>Kavya Katal</h1>
                    <p className='text-white/60'>KavyaKatal96</p>
                </div>
            </div>

            <h1 className='border text-blue-300 border-blue-300 flex justify-center items-center bg-blue-600/10 rounded-xl my-5 p-2'>Edit Profile</h1>

            <div className='flex flex-col justify-center my-10 gap-5 mx-2'>
                <h1 className='text-white/75 text-m'>India</h1>
                <h1 className='text-white/75 text-m'>Newton School of Technology</h1>
                <h1 className='text-white/75 text-m'>KatalKavya96</h1>
                <h1 className='text-white/75 text-m'><a href=''>LinkedIn</a></h1>
            </div>
        </div>
    </>

  )
}

export default ProfileCard