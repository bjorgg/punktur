import  { connectToDatabase } from '../../util/mongodb'
import { getStoryById, getStories } from '../../db/stories';
import { Polly } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import AudioPlayer from '../../components/AudioPlayer'
import { useRouter } from 'next/router'
import styles from '../../styles/Story.module.css'
import Like from "../../components/Like";
import Image from 'next/image'

import {
    FacebookShareButton,
    FacebookIcon,
    RedditIcon,
    RedditShareButton,
    TwitterShareButton,
    TwitterIcon,
    TelegramShareButton,
    TelegramIcon,
} from "react-share";


export default function Stories({ story, speechUrl }) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
      }

    return (
        <div>
            <div>
                <Image className={styles.backArrow} onClick={() => router.back()} src="/Icons/ArrowLeft.svg" alt="til baka" width={24} height={24} />
            </div>
            {story &&
              <div className={styles.storyWrapper}>
                <div className={styles.storyHeader}>
                    <div className={`tags ${styles.genres}`}>
                        {story.genres.map((genre) => 
                            <div key={genre} className={styles.genre}>
                                {genre}
                            </div>
                        )}
                    </div>
                    <div className={styles.like}>
                        <Like story={story}/>
                    </div>
                </div>
                <div className={styles.storyMain}>
                    <div className={styles.headWrapper}>
                        <AudioPlayer url={speechUrl}/>
                        <div className={styles.storyTitles}>
                            <h3>{story.title}</h3>
                            <h5>Höfundur: {story.author}</h5>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: story.html}}></div>
                    
                    <div className={styles.socialIcons}>
                        <FacebookShareButton
                            url={`https://punktur.vercel.app/stories/${story.id}`}
                            quote={`${story.title} Eftir ${story.author}`}
                            hashtag={'#punktur'}
                            >
                            <FacebookIcon size={32} round iconFillColor={"white"}/>
                        </FacebookShareButton>                    
                        <TwitterShareButton
                            url={`https://punktur.vercel.app/stories/${story.id}`}
                            title={`${story.title} Eftir ${story.author}`}
                            hashtag={'#punktur'}
                            >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <TelegramShareButton
                            url={`https://punktur.vercel.app/stories/${story.id}`}
                            title={`${story.title} Eftir ${story.author}`}
                            hashtag={'#punktur'}
                            >
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                        <RedditShareButton
                            url={`https://punktur.vercel.app/stories/${story.id}`}
                            title={`${story.title} Eftir ${story.author}`}
                            hashtag={'#punktur'}
                            >
                            <RedditIcon size={32} round />
                        </RedditShareButton>
                    </div> 
               
                </div>
              </div>
            }
        </div>
    )
}



export async function getStaticPaths(){
    const { db } = await connectToDatabase();
    const stories = await getStories(db, 90);

    const paths = stories.map(story => ({
        params: {
            id: story._id,
        },
    }))

    return {
        paths,
        fallback: true,
    }
}


// Getting static props from MongoDB and AWS Polly TTS
export async function getStaticProps({params}) {
    // MongoBD
    const {db} = await connectToDatabase();
    const story = await getStoryById(db, params.id);

    if (!story) {
        return {
          notFound: true,
        }
      }

     // Connecting to Amazon Polly TTS client
     const client = new Polly({
        region: process.env.AWS_REGION_MYAPP,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID_MYAPP,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MYAPP,
        },
    });
    
    // Configuring the text to speech for Polly
    const unitedStory = {
        title: `Titill: ${story.title}`, 
        author: `. Höfundur: ${story.author}`, 
        genres: `. Flokkur: ${story.genres}`, 
        text: `. Nú hefst sagan: ${story.text}`,
    }

    // Getting all the values from the unitedStory object
    const unitedStoryValues = Object.values(unitedStory)
    // Setting the united values to string
    const textForPolly = unitedStoryValues.toString()
   
    const speechParams = {
        OutputFormat: "mp3",
        Text: textForPolly,
        TextType: "text",
        VoiceId: "Dora",
    }
       
    const url = await getSynthesizeSpeechUrl({
        client,
        params: speechParams,
    });

    return {
        props: {
            story,
            speechUrl: url,
        },
        revalidate: 1, 
    }
}