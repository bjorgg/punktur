import { useCurrentUser } from "../hooks/user";
import { Editor } from '@tinymce/tinymce-react'
import Genres from '../components/Genres'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from "../styles/Form.module.css";


export default function NewStory() {
    const [user, { mutate }] = useCurrentUser();
    const router = useRouter()

    const handleCreateStory = async () => {
        const title = document.querySelector('#storyTitle').value;
        const story = tinymce.get('storyContent').getContent();
        const decodedStory = tinymce.html.Entities.decode(story)
        const pureStory = tinymce.get('storyContent').getContent({format : 'text'});
        const checkboxes = Array.from(document.querySelectorAll('input[name="genre"]'));
        const genres = checkboxes
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
        try {
            const result = await fetch("/api/createStory", {
                method: "POST",
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({ 
                    title: title,
                    text: pureStory,
                    html: decodedStory,
                    genres, 
                    author: user.username,
                    user_id: user._id, 
                    publishDate: new Date()
                }),
            });
            const savedStory = await result.json();
            router.push({
                pathname: `/stories/${savedStory._id}`,
                query: { showStoryCreatedMessage: true },
            });
            console.log("POSTED!", savedStory);   
        } catch (err) {
            console.log(err); 
        }
    };

    return (
        <div className={styles.editorContainer}>
            <h4>Titill</h4>
            <input className={styles.storyTitleInput} id='storyTitle' type='text' />
            <div className={styles.editor}> 
                <Editor
                    id='storyContent'
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    init={{
                        selector: 'textarea',
                        skin_url: '/skins/ui/CUSTOM',
                        plugins: 'wordcount table preview paste', 
                        placeholder: 'Einu sinni var...',
                        skin: 'content',
                        // content_css: 'content',  
                        height: 500,
                        max_width : 200,
                        menubar: false,
                        style_formats: [
                            { title: 'H1', format: 'h2' },
                            { title: 'Texti', format: 'p' },
                        ],      
                        toolbar: 'styleselect undo redo bold italic underline outdent indent preview ',
                }} />
            </div>
           
            <Genres />
            <div className={styles.storyButtonDiv}>
                <button onClick={() => router.back()} className={styles.storyButton}>Hætta við</button>
                <button 
                    className={styles.storyButton}
                    onClick={handleCreateStory}>
                    <Image  
                        src="/Icons/BookOpen.svg"
                        alt="Ný saga"
                        width={24}
                        height={24}
                    />
                    Birta sögu
                </button>
            </div>
            
        </div>
    )
}
