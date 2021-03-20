import { useState } from 'react'
import { useCurrentUser } from "../hooks/user";
import { Editor } from '@tinymce/tinymce-react'
import Genres from '../components/Genres'

export default function NewStory() {
    const [user, { mutate }] = useCurrentUser();
    // const [title, setTitle] = useState('')
    // const [text, setText] = useState('')
    // const [genre, setGenre] = useState('')

    // Author and user_id defined from user info.

    // How to prevent the same story to be saved more than once?
    const handleCreateStory = async () => {
        const title = document.querySelector('#storyTitle').value;
        const story = tinymce.get('storyContent').getContent();
        const checkboxes = Array.from(document.querySelectorAll('input[name="genre"]'));
        const genres = checkboxes
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        const result = await fetch("/api/createStory", {
            method: "POST",
            body: JSON.stringify({ 
                title: title,
                text: story,
                genres, 
                author: user.username,
                user_id: user._id 
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
                }} />
            <Genres />
            <button onClick={handleCreateStory}>Birta sögu</button>
        </div>
    )
}
