import { useCurrentUser } from "../../hooks/user";
import React, { useState, useContext, useEffect, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import Genres from '../../components/Genres'
import Link from 'next/link'
import { useRouter } from 'next/router'
import  { connectToDatabase } from '../../util/mongodb'
import { getStoryById } from '../../db/stories';


// Ath ef síðan refresh-ast dettur sagan út ...
// redirect on refresh kannski? eða reyna useRef aftur ...?

export default function EditStory({story}) {
    // const [user] = useCurrentUser();
    const router = useRouter()
  
    const [updatedStoryText, setUpdatedStoryText] = useState({ 
        text: story.text,
    })
    const [updatedStory, setUpdatedStory] = useState({ 
        title: story.title,
        genres: story.genres,
    })

    const Genres = [
        'börn',
        'hryllingur',
        'rómantík',
        'kómedía',
        'tragedía',
        'spenna',
        'hasar',
        'vísindaskáldskapur',
        'ævintýri',
        'sannsögulegt',
        'nútíma',
        'hversdagsleiki',
        'ljóð',
        'áskorun mánaðarins'
      ] 


    const updateEntryInDb = async () => {
        const res = await fetch('/api/story', {
            method: "PATCH",
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({  // Updated entry array ...
                _id: story._id,
                title: updatedStory.title,
                text: updatedStoryText.text,
                genres: updatedStory.genres,
                // genres: updatedStory.genres,
                // author: "Árnamaðkur", // Tengja við user hér og líka user_id fyrir neðan
                // user_id: "2873926ea8458s29424u93u409" 
            }),
        });
        const savedStory = await res.json();
        alert('Story updated'); // Success modal í staðinn fyrir alert ...
        console.log(`savedStory`, savedStory)
        router.push(`/stories/${savedStory.story._id}`)

        // Validate ...
    };
     

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUpdatedStory({...updatedStory, [e.target.name]: value})
        console.log(updatedStory.genres)
    }

    const handleEditorChange = (content) => {
        setUpdatedStoryText({...updatedStoryText, text: content})
        console.log(updatedStoryText)
    }


    // const checked = 'name' === story.genres ? true : false


    return (
            <div>
                {story &&
                    <div>
                    <div>                        
                        <input value={updatedStory.title} onChange={handleChange} name="title" type="text"></input>                            
                    </div>
                    <div>
                        <Editor
                            id='editStoryContent'
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            value={updatedStoryText.text}
                            textareaName='text'
                            onEditorChange={handleEditorChange}
                            init={{
                                selector: 'textarea',
                                skin_url: '/skins/ui/CUSTOM',
                                plugins: 'wordcount table', 
                                skin: 'content',
                                // content_css: 'content',  
                                height: 500,
                                menubar: false,
                                toolbar: 'undo redo bold italic underline indent outdent styleselect',
                            }}
                        />
                    </div>
                    <div>
                        {/* genres virkar ekki svona hér, þarf að skoða */}
                        {/* <Genres onChange={handleChange} checked={updatedStory.genres} value={ genres } />                    */}
                        {Genres &&
                            Genres.map((genre, i) => (
                                <div id='editStoryGenres' key={ genre }>
                                    <input id={`genre${i}`} type="checkbox" name="genres" onChange={handleChange} value={ genre } />
                                    <label htmlFor={`genre${i}`}>{ genre }</label>
                                </div>
                        ))}
                    </div>        
                       
                    <Link href={`/stories/${story._id}`}>
                        <a>Hætta við</a>
                    </Link>
                    <button onClick={updateEntryInDb}>Vista breytingar</button>
                    
                    </div>
                }
              
        </div>
        
    )
}

// Getting sever side props from MongoDB
export async function getServerSideProps({params}) {
    // MongoBD
    const {db} = await connectToDatabase();
    const story = await getStoryById(db, params.id);
    console.log(story)
    

    return {
        props: {
            story,
        },
    }
}