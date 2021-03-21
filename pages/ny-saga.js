import { useState } from 'react'
import TextEditor from '../components/TextEditor'
import GenresArray from '../components/Genres'

export default function NewStory() {
    // const [title, setTitle] = useState('')
    // const [text, setText] = useState('')
    // const [genre, setGenre] = useState('')

    // Author and user_id defined from user info.

    // How to prevent the same story to be saved more than once?
    const handleCreateStory = async () => {
        const title = document.querySelector('#storyTitle').value;
        const story = tinymce.get('storyContent').getContent();
        // const genre = document.querySelector('#storyGenres').value;
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
                author: "Árnamaðkur", // Tengja við user hér og líka user_id fyrir neðan
                user_id: "605351b83ac44511943c4757" 
            }),
        });
        const savedStory = await result.json();
        alert('Story posted');
        window.location.href = `/stories/${savedStory._id}`;
        console.log("POSTED!", savedStory);
        // Catch error?
    };

    return (
        <div>
            <input id='storyTitle' type='text' />
            <TextEditor />
            <GenresArray />
            <button onClick={handleCreateStory}>Birta sögu</button>
        </div>
    )
}
