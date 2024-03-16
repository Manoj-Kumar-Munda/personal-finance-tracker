import React from 'react'
import Wave from '../assets/wave.svg'


const Profile = () => {
  return (
    <div className=' relative'>
      <div className='absolute bottom-0 w-full'>
        <img src={Wave} className='w-full'/>
      </div>
    </div>
  )
}

export default Profile