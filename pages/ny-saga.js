import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';

export default function NewStory() {
    // const [title, setTitle] = useState('')
    // const [text, setText] = useState('')
    // const [genre, setGenre] = useState('')

    // Author and user_id defined from user info.

    // How to prevent the same story to be saved more than once?
    const handleCreateStory = async () => {
        const title = document.querySelector('#storyTitle').value;
        const story = tinymce.get('storyContent').getContent();

        const result = await fetch("/api/createStory", {
            method: "POST",
            body: JSON.stringify({ 
                title: title,
                text: story,
                genres: ["Vinsælt", "Tragedía"],
                author: "Árnamaðkur", // Tengja við user hér og líka user_id fyrir neðan
                user_id: "605351b83ac44511943c4757" 
            }),
        });
        const savedStory = await result.json();
        // set to stories array, use concat to add to it
        alert('Story posted');
        window.location.href = `/stories/${savedStory._id}`;
        console.log("POSTED!", savedStory);
        // Catch error?
    };

    return (
        <div>
            <input id='storyTitle' type='text' />
            <Editor
                id='storyContent'
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                init={{
                    selector: 'textarea',
                    skin_url: '/skins/ui/CUSTOM',
                    plugins: 'wordcount table', 
                    placeholder: 'Einu sinni var...',
                    skin: 'content',
                    // content_css: 'content',  
                    height: 500,
                    menubar: false,
                    toolbar: 'undo redo bold italic underline indent outdent styleselect',
                }}
            />
            <button onClick={handleCreateStory}>Birta sögu</button>
        </div>
    )
}
