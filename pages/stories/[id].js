import  { connectToDatabase } from '../../util/mongodb'
import { getStoryById } from '../../db/stories';
import { useCurrentUser } from "../../hooks/user";
import {DataContext} from '../../components/Context'
import { useContext, useEffect } from 'react'
import Link from 'next/link'

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
    console.log(storyToUpdate)
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
    console.log(story);

    return {
        props: {story},
        revalidate: 1, 
    }
}