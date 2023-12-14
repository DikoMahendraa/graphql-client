"use client"
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export default function PageCreateUser() {

  const router = useRouter()
  const onHandleBack = () => router.back()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const name = (event.target as HTMLFormElement).username.value;
    const email = (event.target as HTMLFormElement).email.value;
    const address = (event.target as HTMLFormElement).address.value;
    const religion = (event.target as HTMLFormElement).religion.value;
    const gender = (event.target as HTMLFormElement).gender.value;
    const phone = (event.target as HTMLFormElement).phone.value;


    console.log({ name, email, address, religion, gender, phone })
  }

  return (
    <div className='w-full flex flex-col justify-center h-screen items-center'>
    <div className='w-[30rem] overflow-hidden'>
      <div className='mb-8'>
      <button className='px-4 border-black bg-red-500 text-white border capitalize' onClick={onHandleBack}>back</button>
      </div>
      <div className='w-full text-center'>
        <p className='text-center uppercase underline font-semibold'>
          CREATE NEW USER
        </p>

        <form onSubmit={handleSubmit} className='mt-6'>
          <div className='flex justify-between space-x-4'>
            <div className='w-full space-y-2'>
             <div className='text-left'>
                <label htmlFor="">Name</label>
                <input type="text" name='username' className='border-gray-500 p-2 w-full outline-none border' placeholder='enter name' />
             </div>
             <div className='text-left'>
              <label htmlFor="">Email</label>
                <input type="text" name='email' className='border-gray-500 p-2 w-full outline-none border' placeholder='enter email' />
              </div>
              <div className='text-left'>
                <label htmlFor="">Address</label>
                <input type="text" name='address' className='border-gray-500 p-2 w-full outline-none border' placeholder='enter address' />
              </div>
            </div>
            <div className='w-full space-y-2'>
              <div className='text-left'>
                <label htmlFor="">Religion</label>
                <input type="text" name='religion' className='border-gray-500 p-2 w-full outline-none border' placeholder='enter religion' />
              </div>
              <div className='text-left'>
                <label htmlFor="">Gender</label>
                <input type="text" name='gender' className='border-gray-500 p-2 w-full outline-none border' placeholder='enter gender' />
              </div>
              <div className='text-left'>
                <label htmlFor="">Phone</label>
                <input type="text" name='phone' className='border-gray-500 p-2 w-full outline-none border' placeholder='enter phone' />
              </div>
            </div>
          </div>

        <div className='flex justify-end'>
          <button className='capitalize bg-green-400 px-2 py-1 mt-4 border-black border font-semibold' type='submit'>
              submit
            </button>
        </div>
        </form>
        
      </div>
    </div>
  </div>
  )
}
