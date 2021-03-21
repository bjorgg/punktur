import { useCurrentUser } from "../hooks/user";
import React, { useState, useContext, useEffect, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import {DataContext} from '../components/Context'
import GenresArray from '../components/Genres'
import Link from 'next/link'

export default function EditStory() {
    // const [user] = useCurrentUser();

    // useContext reads the context and subscribes to its changes
    const {storyToUpdate, setStoryToUpdate} = useContext(DataContext)
    console.log(storyToUpdate)

    const [updatedStory, setUpdatedStory] = useState({ 
        title: storyToUpdate.title,
        genres: storyToUpdate.genres,
    })

    const [updatedStoryText, setUpdatedStoryText] = useState({ 
        text: storyToUpdate.text,
    })
    
    // Þarf ég að hafa höfund og user id með ef það er ekki að fara að breytast?
    // user id 605351b83ac44511943c4757
    const updateEntryInDb = async () => {
        const res = await fetch('/api/story', {
            method: "PATCH",
            body: JSON.stringify({  // Updated entry array ...
                _id: storyToUpdate._id,
                title: updatedStory.title,
                text: updatedStoryText.text,
                genres: updatedStory.genres,
                // author: "Árnamaðkur", // Tengja við user hér og líka user_id fyrir neðan
                // user_id: "2873926ea8458s29424u93u409" 
            }),
        });
        const updatedStory = await res.json();
        alert('Story updated');
        window.location.href = `/stories/${updatedStory._id}`;
        // Handle errors ?
    };
     // Gera kannski Handle submit og kalla í updateEntryInDb þar

    // Virkar ekki að sækja frá input og editor saman, þarf að skoða ...
    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUpdatedStory({...updatedStory, [e.target.name]: value})
        console.log(updatedStory.title)
    }

    const handleEditorChange = (content) => {
        setUpdatedStoryText({...updatedStoryText, text: content})
        console.log(updatedStoryText)
    }

    return (
            <div>
                {storyToUpdate &&
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
                        <GenresArray value={updatedStory.genres} onChange={handleChange}/>                   
                    </div>        
                       
                    <Link href={`/stories/${storyToUpdate._id}`}>
                        <a>Hætta við</a>
                    </Link>
                    <button onClick={updateEntryInDb}>Vista breytingar</button>
                    
                    </div>
                }
              
        </div>
        
    )
}
