import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';

export default function NewStory() {
    // const [title, setTitle] = useState('')
    // const [subTitle, setSubTitle] = useState('')
    // const [text, setText] = useState('')
    // const [genre, setGenre] = useState('')
    // Author and user_id defined from user info.
    // Slug?

    // How to prevent the same story to be saved more than once
    const handleCreateStory = async () => {
        const title = document.querySelector('#storyTitle').value;
        const story = tinymce.get('storyContent').getContent();

        const result = await fetch("http://localhost:3000/api/createStory", {
            method: "post",
            body: JSON.stringify({ 
                title: title,
                text: story,
                genres: ["Vinsælt", "Tragedía"], // Hvað ef það eru fleiri en einn flokkur? Array!
                author: "Árnamaðkur",
                user_id: "2873926ea8458s29424u93u409" 
            }),
        });
        const savedStory = await result.json();
        // set to stories array, use concat to add to it
        // spurning þá hvernig á að höndla save annars vegar og svo publish?
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
                    placeholder: 'Einu sinni var...',
                    skin: 'content',
                    // content_css: 'content',  
                    height: 500,
                    menubar: false,
                    toolbar: 'p h2 undo redo bold italic underline indent outdent',
                }}
            />
            <button onClick={handleCreateStory}>Birta sögu</button>
        </div>
    )
}
