import styles from '../styles/Home.module.css'
import Head from 'next/head'


import { connectToDatabase } from '../util/mongodb'

export default function Home({ users }) {

  console.log(users);

  return (

        <div>
            {users && users.map(user => (
              <div>
                <p>hello{user.username}</p>
                <p>bye{user.email}</p>
              </div>
              
            ))}
        </div>

  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase()


  const data = await db.collection('users').find({}).limit(20).toArray();
  await db.listCollections().toArray(function(err, collInfos) {
    // collInfos is an array of collection info objects that look like:
    // { name: 'test', options: {} }
    // console.log(err, collInfos)
  });
  const users = JSON.parse(JSON.stringify(data));
  
  console.log(data)
  return {
    props: { users: users },
  }
}
