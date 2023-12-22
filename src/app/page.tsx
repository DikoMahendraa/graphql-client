"use client"

import { useRouter } from 'next/navigation';
import { useDeleteUserMutation, useUserQuery } from '@/graphql/generated/schema';

const Users = () => {
  const router = useRouter()
  const { loading, error, data, refetch } = useUserQuery();
  const [deleteUserMutation] = useDeleteUserMutation({
    onCompleted: () => {
      refetch()
    }
  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onHandleCreateUser = () => router.push("/users/create")

  return (
    <div className='space-y-4 w-[30rem]'>
      <div className='flex items-center justify-between'>
        <p className='text-blue-500 font-semibold my-4'>
          List Users :
        </p>

        <button onClick={onHandleCreateUser} className='bg-blue-400 text-white uppercase px-4 py-1 border border-black'>
            create user
        </button>
      </div>

      <div className='space-y-4'>
        {data?.users?.map((item) => (
          <div className='flex justify-between items-center' key={item?.id}>
            <div className='flex flex-col'>
              <p><b>Name</b>: {item?.name}</p>
              <p><b>Email</b>: {item?.id}</p>
            </div>

            <div className='ml-6 flex items-center'>
              <button onClick={() => router.push(`/users/${item?.id}`)}
               className='bg-green-500 border-black text-white border px-4'>
                detail
              </button>
              <button onClick={
                async () => {
                  try {
                    const result = await deleteUserMutation({
                      variables: { userId: String(item?.id) },
                    });
                    console.log(result);
                  } catch (error) {
                    console.error("Error deleting user:", error);
                  }
                }}    
               className='bg-red-500 border-black text-white border ml-2 px-4'>
                remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => (  
    <div className='flex flex-col justify-center h-screen items-center'>
      <h1 className='text-red-600 text-3xl font-semibold mb-2 underline'>GraphQL Users</h1>
      <Users />
    </div>
);

export default App;