import React from 'react'
import {useUser} from "../components/UserContext"

const ProfileCard = () => {
    const { user } = useUser();

  return (
    
    <>
        <div className='w-full h-[410px] max-w-xs bg-white rounded-xl p-4 mx-auto md:mx-0 border border-black/25 shadow-xl'>

            <div className='flex items-center justify-between p-2 my-5'>
                <img
                src={user?.photoURL || 'https://i.postimg.cc/SKfhtdnJ/avatar-placeholder.png'}
                alt="Profile"
                className='w-20 h-20 bg-blue-600/15 border border-blue-300 rounded-xl object-cover'
                />  
                <div>
                    <h1 className='text-black/80'>{user?.displayName || 'No Name'}</h1>
                    <p className='text-black/60'>KavyaKatal96</p>
                </div>
            </div>

            <h1 className='border text-blue-600 border-blue-300 flex justify-center items-center bg-blue-600/15 rounded-xl my-5 p-2'>Edit Profile</h1>

            <div className='flex flex-col justify-center my-10 gap-5 mx-2'>
                <h1 className='text-black/75 text-m'>India</h1>
                <h1 className='text-black/75 text-m'>Newton School of Technology</h1>
                <h1 className='text-black/75 text-m'>{user?.email || 'No Email'}</h1>
                <h1 className='text-black/75 text-m'><a href=''>LinkedIn</a></h1>
            </div>
        </div>
    </>

  )
}

export default ProfileCard