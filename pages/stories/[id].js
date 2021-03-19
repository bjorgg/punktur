import  { connectToDatabase } from '../../util/mongodb'
import { getStoryById } from '../../db/stories';

export default function Stories({ story }) {

    // onCange - handleChange
    // Breyta sögu takki hér, þá opnast text editor með values inni
    // Fetcha api

    const updateEntryInDb = async () => {
        const _id = '605368893ac44511943c4759'
        const result = await fetch('/api/editStory/605368893ac44511943c4759', {
            method: "PATCH",
            body: JSON.stringify({  // Updated entry array ...
                title: "Breyttur titill",
                text: "Breytt saga",
                genres: ["Vinsælt", "Tragedía"],
                // author: "Árnamaðkur", // Tengja við user hér og líka user_id fyrir neðan
                // user_id: "2873926ea8458s29424u93u409" 
            }),
            headers: {'Content-Type': 'application/json'}
        });
        const updatedStory = await result.json();
    
        alert('Story updated');
        // window.location.href = `/stories/${updatedStory._id}`;
        // console.log("UPDATED!", updatedStory);
        // Catch error?
    };

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
            <button onClick={updateEntryInDb}>Birta breytta sögu</button>
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