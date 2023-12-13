"use client"

import { gql } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation'

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;


export default function DetailUser() {
  const pathName = useParams()
  const router = useRouter()
  const userId = pathName.id as string

  const onHandleBack = () => router.back()

  return (
    <div className='w-full flex flex-col justify-center h-screen items-center'>
      <div className='w-[10rem] h-[10rem]'>
        <div className='mb-8'>
          <button onClick={onHandleBack}>back</button>
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
