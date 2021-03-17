import { useState } from 'React'

export default function NewStory() {
    // const [title, setTitle] = useState('')
    // const [subTitle, setSubTitle] = useState('')
    // const [text, setText] = useState('')
    // const [genre, setGenre] = useState('')
    // Author and user_id defined from user info.
    // Slug?

    // How to prevent the same story to be saved more than once
    const handleCreateStory = async () => {

        const result = await fetch("http://localhost:3000/api/createStory", {
            method: "post",
            body: JSON.stringify({ 
                title: "Önnur post prufa ",
                text: "Ný saga úr post request",
                genre: "Vinsælt", // Hvað ef það eru fleiri en einn flokkur?
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
            <button onClick={handleCreateStory}>Birta sögu</button>
        </div>
    )
}
