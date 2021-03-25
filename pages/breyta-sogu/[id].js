import React, { useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import  { connectToDatabase } from '../../util/mongodb'
import { getStoryById } from '../../db/stories'
import styles from "../../styles/Form.module.css";
;


export default function EditStory({story}) {
    const router = useRouter()
  
    const [updatedStoryHtml, setUpdatedStoryHtml] = useState({ 
        html: story.html,
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
        const decodedStory = tinymce.html.Entities.decode(updatedStoryHtml.html)
        const pureStory = tinymce.get('editStoryContent').getContent({format : 'text'});
        
        try {
            const res = await fetch('/api/story', {
                method: "PATCH",
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({ 
                    _id: story._id,
                    title: updatedStory.title,
                    text: pureStory,
                    html: decodedStory,
                    genres: updatedStory.genres,
                    publishDate: new Date()
                }),
            });
            const savedStory = await res.json();
            console.log(`savedStory`, savedStory)
            router.push({
                pathname: `/stories/${savedStory.story._id}`,
                query: { showStoryEditMessage: true },
            });
        } catch (err) {
            console.log(err); 
        }
    };
     

    const handleChange = (e) => {
        setUpdatedStory({...updatedStory, [e.target.name]: e.target.value})
    }

    const handleEditorChange = (content) => {
        setUpdatedStoryHtml({...updatedStoryHtml, html: content})
    }

    const handleGenreChange = (e) => {
        const isChecked = e.target.checked
        const value = e.target.value
        const genresCopy = updatedStory.genres.slice(0)
        if (isChecked) {
            genresCopy.push(value)
        } else {
            const index = genresCopy.indexOf(value)
            if (index < 0) return 
            genresCopy.splice(index, 1)
        }
        setUpdatedStory({...updatedStory, genres: genresCopy})
    }


    return (
            <div>
                {story &&
                    <div>
                    <div> 
                        <h5>Titill</h5>                       
                        <input className={styles.storyTitleInput} value={updatedStory.title} onChange={handleChange} name="title" type="text"></input>                            
                    </div>
                    <div>
                        <Editor
                            id='editStoryContent'
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            value={updatedStoryHtml.html}
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
                        {Genres &&
                            Genres.map((genre, i) => (
                                <div id='editStoryGenres' key={ genre }>
                                    <input id={`genre${i}`} type="checkbox" name="genres" checked={updatedStory.genres.includes(genre)} onChange={handleGenreChange} value={ genre } />
                                    <label htmlFor={`genre${i}`}>{ genre }</label>
                                </div>
                        ))}
                    </div>        
                       
                    <Link href={`/stories/${story._id}`}>
                        <a>Hætta við</a>
                    </Link>
                    <div className={styles.storyButtonDiv}>
                        <button className={styles.storyButton} onClick={updateEntryInDb}>Vista breytingar</button>
                    </div>
                    
                    </div>
                }
              
        </div>
        
    )
}

// Getting sever side props from MongoDB
export async function getServerSideProps({params}) {
    const {db} = await connectToDatabase();
    const story = await getStoryById(db, params.id);
    console.log(story)
    
    if (!story) {
        return {
          notFound: true,
        }
      }

    return {
        props: {
            story,
        },
    }
}