"use client"

import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation'
import {  useEffect } from 'react'
import { useForm } from 'react-hook-form';


export const UPDATE_USER_MUTATION = gql`
mutation UpdateUser(
  $userId: ID!,
  $name: String,
  $email: String,
  $address: String,
  $religion: String,
  $phone: String
  ){
    updateUser(
      userId: $userId,
      name: $name,
      email: $email,
      address: $address,
      religion: $religion,
      phone: $phone
  ) {
    id
    name
    email
    address
    religion
    phone
  }
}
`;

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



export default function PageCreateUser() {
  const pathName = useParams()
  const userId = pathName?.id as string
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset
  } = useForm()

  const onHandleBack = () => router.back()

  const { loading, error, data } = useQuery(GET_USER_DETAIL, {
    variables: { id: Number(userId) | 0 },
    fetchPolicy: "no-cache"
  });
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const onSubmit = async (payload: any) => {

    try {
      await updateUser({
        variables: {
          userId,
          ...payload,
        },
      });

      console.log('User updated successfully:');
    } catch (error) {
      console.error('Error updating user:');
    }
  };

  useEffect(() => {
    if(data?.user) {
      reset({
        email: data?.user?.email,
        name: data?.user?.name,
        address: data?.user?.address,
        religion: data?.user?.religion,
        phone: data?.user?.phone,
      })
    }
  }, [data?.user, reset])

  return (
    <div className='w-full flex flex-col justify-center h-screen items-center'>
    <div className='w-[30rem] overflow-hidden'>
      <div className='mb-8'>
      <button className='px-4 border-black bg-red-500 text-white border capitalize' onClick={onHandleBack}>{`< `}back</button>
      </div>
      <div className='w-full text-center'>
        <p className='text-center uppercase underline font-semibold'>
          CREATE NEW USER
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
          <div className='flex justify-between space-x-4'>
            <div className='w-full space-y-2'>
             <div className='text-left'>
                <label htmlFor="">Name</label>
                <input {...register('name')} type="text" className='border-gray-500 p-2 w-full outline-none border' placeholder='enter name' />
             </div>
             <div className='text-left'>
              <label htmlFor="">Email</label>
                <input type="text" {...register('email')} className='border-gray-500 p-2 w-full outline-none border' placeholder='enter email' />
              </div>
              <div className='text-left'>
                <label htmlFor="">Address</label>
                <input type="text" {...register('address')} className='border-gray-500 p-2 w-full outline-none border' placeholder='enter address' />
              </div>
            </div>
            <div className='w-full space-y-2'>
              <div className='text-left'>
                <label htmlFor="">Religion</label>
                <input type="text" {...register('religion')} className='border-gray-500 p-2 w-full outline-none border' placeholder='enter religion' />
              </div>
              <div className='text-left'>
                <label htmlFor="">Phone</label>
                <input type="text" {...register('phone')} className='border-gray-500 p-2 w-full outline-none border' placeholder='enter phone' />
              </div>
            </div>
          </div>

        <div className='flex justify-end'>
          <button className='capitalize bg-green-400 px-2 py-1 mt-4 border-black border font-semibold' type='submit'>
              {loading ? "...loading" : "submit"}
            </button>
        </div>
        </form>
        
      </div>
    </div>
  </div>
  )
}
