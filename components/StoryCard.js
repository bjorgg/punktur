import Link from "next/link";
import Like from "./Like.js";
import styles from '../styles/StoryCard.module.css';



const StoryCard = ({story}) => {
    return ( 
      
            <div className={styles.cardWrapper}> 
                <div className={styles.cardTop}>
                    <div className={styles.genres}>
                        genre:
                        {story.genres.map((genre) => 
                            <div key={genre}>
                                {genre}
                            </div>
                        )}
                    </div>
                    {/* <p>genre:{story.genres}</p> */}
                    <Like story={story}/>
                </div>
                <Link href={`/stories/${story._id}`}>
                <div>
                    <p>title: {story.title}</p>
                    <p>author: {story.author}</p>
                </div>
                </Link>
            </div>
        
    );
}
 
export default StoryCard;