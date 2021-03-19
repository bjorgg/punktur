import  { connectToDatabase } from '../../util/mongodb'
import { getStoryById } from '../../db/stories';

export default function Stories({ story }) {
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
    }
}