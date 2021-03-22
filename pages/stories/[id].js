import  { connectToDatabase } from '../../util/mongodb'
import { getStoryById } from '../../db/stories';
import { useCurrentUser } from "../../hooks/user";
import {DataContext} from '../../components/Context'
import { useContext, useEffect } from 'react'
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

export default function Stories({ story }) {
    const [user] = useCurrentUser();
    // useContext reads the context and subscribes to its changes
    const {storyToUpdate, setStoryToUpdate} = useContext(DataContext)
    useEffect(() => {
        if (!story) {
            return
        } else {
            setStoryToUpdate(
                   story
                )
        }
        
    }, [story]) 

    return (
        <div>
            {story &&
              <div>
                <p>hello title: {story.title}</p>
                <p>hello author: {story.author}</p>
                {/* <p>hello text: {story.text}</p> */}
                <p dangerouslySetInnerHTML={{__html: story.text}}></p>
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
                <div>
                    {/* Breyta þannig að réttur notandi sjái bara við sínar sögur eða færa þetta á sögur á min-sida */}
                    {!user ? '' : (
                        <Link href="/breyta-sogu">
                            <a>Breyta sögu</a>
                        </Link>
                    )}
                </div>
                
              </div>
            }
        </div>
    )
}

export async function getStaticPaths(){
    return {
        paths: [],
        fallback: true,
    }
}

export async function getStaticProps({params}) {
    const {db} = await connectToDatabase();
    const story = await getStoryById(db, params.id);
    return {
        props: {story},
        revalidate: 1, 
    }
}