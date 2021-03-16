import  { connectToDatabase } from '../../util/mongodb'
import { ObjectID } from 'mongodb';

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
    console.log(params.id)

    const data = await db.collection('stories')
    .findOne({
        _id: new ObjectID(params.id)
    }, {
        projection: {
            title: 1,
            text: 1,
            author: 1,
            genre: 1,
        }
    })
    console.log()
    return {
        props: {story: JSON.parse(JSON.stringify(data))},
    }
}