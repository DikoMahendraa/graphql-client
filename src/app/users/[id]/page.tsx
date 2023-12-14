"use client"

import { gql, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation'

const GET_USER_DETAIL = gql`
  query User($id: Int!) {
    user(id: $id) {
      id
      name
      email
      address
      phone
    }
  }
`;

export default function DetailUser() {
  const pathName = useParams()
  const router = useRouter()
  const userId = pathName?.id as string

  const { loading, error, data } = useQuery(GET_USER_DETAIL, {
    variables: { id: Number(userId) | 0 }
  });
  
  const onHandleBack = () => router.back()

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='w-full flex flex-col justify-center h-screen items-center'>
      <div className='w-[15rem] h-[10rem]'>
        <div className='mb-8'>
          <button className='bg-red-400 px-4 border-black text-white border capitalize' onClick={onHandleBack}>back</button>
        </div>
        <div>
          <p className='text-center uppercase underline'>Detail Users</p>

        {
          loading ? (
            <div className='mt-4'>
              <p className='text-center'>...loading</p>
            </div>
          ) : (
            <ul className='mt-6 list-disc'>
              <li>name: {data.user.name ?? "-"}</li>
              <li>email: {data.user.email ?? "-"}</li>
              <li>address: {data.user.address ?? "-"}</li>
              <li>phone: {data.user.phone ?? "-"}</li>
            </ul>
          )
        }
          
        </div>
      </div>
    </div>
  )
}
