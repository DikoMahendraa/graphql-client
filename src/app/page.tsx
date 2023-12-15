"use client"

import { useQuery, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

const Users = () => {
  const router = useRouter()
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onHandleDetailUser = (id: string) => {
    router.push(`/users/${id}`)
  }

  const onHandleCreateUser = () => router.push("/users/create")

  const onHandleDelete = async (userId: string) => {
    try {
      const { data } = await deleteUserMutation({
        variables: { userId },
      });

      console.log(data); 
    } catch (error) {
      console.log("Ups something went wrong")  
    }
  };

  return (
    <ul className='list-disc space-y-4 w-1/2'>
      <div className='flex items-center justify-between'>
        <p className='text-blue-500 font-semibold my-4'>
          List Users :
        </p>

        <button onClick={onHandleCreateUser} className='bg-blue-400 text-white uppercase px-4 py-1 border border-black'>
            create user
        </button>
      </div>

      {data.users.map((user: {name: string, email: string, id: string}) => (
        <li className='flex items-center' key={user.id}>
          <div className='flex flex-col'>
            <p><b>Name</b>: {user.name}</p>

             <p><b>Email</b>: {user?.email}</p>
          </div>

          <div className='ml-6 flex items-center'>
            <button onClick={() =>
              onHandleDetailUser(user.id)
            } className='bg-green-500 border-black text-white border px-4'>
              detail
            </button>
            <button onClick={() =>
            onHandleDelete(user.id)
            } className='bg-red-500 border-black text-white border ml-2 px-4'>
              remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const App = () => (  
    <div className='flex flex-col justify-center h-screen items-center'>
      <h1 className='text-red-600 text-3xl font-semibold mb-2 underline'>GraphQL Users</h1>

    
      <Users />
    </div>
);

export default App;