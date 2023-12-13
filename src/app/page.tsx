"use client"

import { useQuery, gql } from '@apollo/client';
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

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const Users = () => {
  const router = useRouter()
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onHandleDetailUser = (id: string) => {
    router.push(`/users/${id}`)
  }

  return (
    <ul className='list-disc space-y-4'>
      <p className='text-blue-500 font-semibold my-4'>
        List Users :
      </p>

      {data.users.map((user: {name: string, email: string, id: string}) => (
        <li className='flex items-center' key={user.id}>
          <div className='flex flex-col'>
            <p><b>Name</b>: {user.name}</p>

             <p><b>Email</b>: {user?.email}</p>
          </div>

          <div className='ml-6'>
            <button onClick={() =>
              onHandleDetailUser(user.id)
            } className='bg-green-500 border-black text-white border px-4'>
              detail
            </button>
            <button onClick={() =>
            onHandleDetailUser(user.id)
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