import { useCurrentUser } from "../../hooks/user";
import React, { useState, useEffect, useRef } from "react";
import  { connectToDatabase } from '../../util/mongodb'
import { getStoryById } from '../../db/stories';
import { Editor } from '@tinymce/tinymce-react';

export default function EditStory({ story }) {
    // const [user] = useCurrentUser();
    // const [msg, setMsg] = useState({ message: "", isError: false });
    const [updatedStory, setUpdatedStory] = useState({
        title: story.title,
        text: story.text,
        // genres: story.genres,
    })
    // Þarf ég að hafa höfund og user id með ef það er ekki að fara að breytast?
    console.log(updatedStory)
    // user id 605351b83ac44511943c4757
    const updateEntryInDb = async () => {
        const res = await fetch('/api/story', {
            method: "PATCH",
            body: JSON.stringify({  // Updated entry array ...
                // _id: "605368893ac44511943c4759",
                title: updatedStory.title,
                text: updatedStory.text,
                // genres: ["Vinsælt", "Tragedía"],
                // author: "Árnamaðkur", // Tengja við user hér og líka user_id fyrir neðan
                // user_id: "2873926ea8458s29424u93u409" 
            }),
        });
        // if (res.status === 200) {
        //     setMsg({ message: "Saga uppfærð" });
        // } else if (res.status === 500) {
        //     setMsg({ message: "Eitthvað fór úrskeiðis, reyndu aftur", isError: true });
        // } else {
        //     setMsg({ message: await res.text(), isError: true });
        // }
    };

    // Virkar ekki að sækja frá input og editor saman, þarf að skoða ...
    const handleChange = (e, content, editor) => {
        // setUpdatedStory({...updatedStory, content, [e.target.name]: e.target.value})
        console.log(content)
    }

    return (
            <div>
                {story ? (
                    <div>
                    <div>                        
                        <input value={updatedStory.title} onChange={handleChange} name="title" type="text"></input>                            
                    </div>
                    <div>
                        <Editor
                            id='editStoryContent'
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            value={updatedStory.text}
                            textareaName='text'
                            onEditorChange={handleChange}
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
                        Flokkar                     
                    </div>        
                       
                    <button>Hætta við</button>
                    <button onClick={updateEntryInDb}>Vista breytingar</button>
                    
                    </div>
                ) : ''}
              
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