import styles from '../styles/Home.module.css'
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import { useEffect } from "react"


import { connectToDatabase } from '../util/mongodb'

export default function Home({ stories, speech }) {
  console.log(stories)
  console.log(speech)

  // useEffect(() => {
  //   const audio = new Audio(speech);
  //   audio.play();
  
  // }, [])

  return (

        <div>
            {stories && stories.map(story => (
              <div key={story._id}>
                <p>hello title: {story.title}</p>
                <p>hello author: {story.author}</p>
                <p>hello text: {story.text}</p>
                <p>hello genre: {story.genre}</p>
                <a href={`/stories/${story._id}`}>READ</a>
              </div>
              
            ))}
        </div>

  )
}

// Connecting to Amazon Polly TTS client
const client = new PollyClient({ 
  region: process.env.AWS_REGION_MYAPP, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_MYAPP, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MYAPP,
  },
});

// Params for synthesizing speech
const params = {
  OutputFormat: "mp3",
  // Text: "Hæ, ég heiti Dóra. Ég les upp fyrir þig texta.",
  Text: '',
  TextType: "text",
  VoiceId: "Dora"
}

// Command for synthesizing speech
const command = new SynthesizeSpeechCommand(params);

// Getting sever side props from MongoDB and AWS Polly TTS
export async function getServerSideProps(context) {
  // MongoBD
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

  // If no data ... ?

  // AWS Polly TTS
  params.Text = filtered.map(story => {
    return story.text
  });
  
  const url = await getSynthesizeSpeechUrl({
    client, params
  });

  // Passing the data receved to the props object 
  return {
    props: { 
      stories: stories,
      speech: url
     },

    // Revalidating at most once every second to re-render the page 
    // in the background as traffic comes in.
    // revalidate: 1,
  }

}
