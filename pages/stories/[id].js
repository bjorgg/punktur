import  { connectToDatabase } from '../../util/mongodb'
import { getStoryById } from '../../db/stories';

export default function Stories({ story }) {
    return (
        <div>
            {story &&
              <div>
                <p>hello title: {story.title}</p>
                <p>hello author: {story.author}</p>
                <p>hello text: {story.text}</p>
                <p>hello genre: {story.genre}</p>
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
    }
}