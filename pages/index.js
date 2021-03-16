import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'

export default function Home({ stories }) {

  

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>


        <div>
            {stories && stories.map(story => (
              <div>
                <p>hello title: {story.title}</p>
                <p>hello author: {story.author}</p>
                <p>hello text: {story.text}</p>
                <p>hello genre: {story.genre}</p>
                <a href={`/stories/${story._id}`}>READ</a>
              </div>
              
            ))}
        </div>

      </main>

      <footer>
    
      </footer>



      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase()

  const data = await db.collection('stories').find({}).sort({_id: 1}).limit(20).toArray();
  
  const stories = JSON.parse(JSON.stringify(data));

  const filtered = stories.map(story => {
    return { //props
      _id: story._id,
      title: story.title,
      text: story.text,
      genre: story.genre,
      author: story.author,
      user_id: story.user_id
    }
  })
  
  return {
    props: { stories: stories },
  }
}
