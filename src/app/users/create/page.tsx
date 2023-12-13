import React from 'react'

export default function page() {
  return (
    <div className='w-full flex flex-col justify-center h-screen items-center'>
    <div className='w-[10rem] h-[10rem]'>
      <div className='mb-8'>
        <button onClick={() => ({})}>back</button>
      </div>
      <div>
        <p className='text-center uppercase underline'>Detail Users</p>

        <ul>
          <li>name: {}</li>
          <li>email: {}</li>
        </ul>
        
      </div>
    </div>
  </div>
  )
}
