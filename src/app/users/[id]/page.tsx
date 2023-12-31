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
      religion
      phone
    }
  }
`;

export default function DetailUser() {
  const router = useRouter()
  const pathName = useParams()
  const userId = pathName?.id as string

  const { loading, error, data } = useQuery<{
      user: {
        name: string
        email: string
        address: string
        phone: string
        religion: string
      }
    }>
    (GET_USER_DETAIL, {
    variables: { id: Number(userId) | 0 },
    fetchPolicy: "no-cache"
  });
  
  const onHandleBack = () => router.back()

  const onHandleUpdateUser = () => router.push(`/users/${userId}/update`)
  

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
              <li><span className='font-semibold'>name:</span> {data?.user?.name ?? "-"}</li>
              <li><span className='font-semibold'>email:</span> {data?.user?.email ?? "-"}</li>
              <li><span className='font-semibold'>address:</span> {data?.user?.address ?? "-"}</li>
              <li><span className='font-semibold'>phone:</span> {data?.user?.phone ?? "-"}</li>
              <li><span className='font-semibold'>religion:</span> {data?.user?.religion ?? "-"}</li>
            </ul>
          )
        }
          
          <div className='mt-6'>
            <button onClick={onHandleUpdateUser} className='bg-blue-400 border border-black capitalize px-4 py-1 w-full'>
              update user
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
