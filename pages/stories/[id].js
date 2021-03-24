import  { connectToDatabase } from '../../util/mongodb'
import { getStoryById } from '../../db/stories';
import { useCurrentUser } from "../../hooks/user";
import { Polly } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import React, { useEffect } from "react";


import Link from 'next/link'
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
import AudioPlayer from '../../components/AudioPlayer'


export default function Stories({ story, speechUrl }) {
    const [user] = useCurrentUser();

    return (
        <div>
            {story &&
              <div>
                <div>
                    <AudioPlayer url={speechUrl}/>
                </div>
                <p>hello title: {story.title}</p>
                <p>hello author: {story.author}</p>
                {/* <p>hello text: {story.text}</p> */}
                <p dangerouslySetInnerHTML={{__html: story.html}}></p>
                <div>
                    genres:
                    {story.genres.map((genre) => 
                        <div key={genre}>
                            {genre}
                        </div>
                    )}
                </div>
                <div>
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
            }
        </div>
    )
}





// Það þarf að skilgreina paths hér annars rebuildast í hvert skipti ... 
export async function getStaticPaths(){
    return {
        paths: [],
        fallback: true,
    }
}


// Getting static props from MongoDB and AWS Polly TTS
export async function getStaticProps({params}) {
    // MongoBD
    const {db} = await connectToDatabase();
    const story = await getStoryById(db, params.id);

     // Connecting to Amazon Polly TTS client
     const client = new Polly({
        region: process.env.AWS_REGION_MYAPP,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID_MYAPP,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MYAPP,
        },
    });
    // Athuga hvort það sé hægt að bæta við texta fyrir framan, s.s. höfundur osvfr.
    const storyForPolly = {title: `Titill: ${story.title}`, author: story.author, genres: story.genres, text: story.text}
    // Sameina values úr story array fyrir Polly
    console.log(Object.values(storyForPolly))
    // console.log(story.text)
    const speechParams = {
        OutputFormat: "mp3",
        Text: story.text,
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