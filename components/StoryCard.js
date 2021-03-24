import Link from "next/link";
import Like from "./Like.js";
import styles from '../styles/StoryCard.module.css';



const StoryCard = ({story}) => {
    return ( 
      
        <Link href={`/stories/${story._id}`}>
            <div className={styles.cardWrapper}> 
                <div className={styles.cardTop}>
                    <div className={`tags ${styles.genres}`}>
                        {story.genres.map((genre) => 
                            <div key={genre} className={styles.genre}>
                                {genre}
                            </div>
                        )}
                    </div>
                    <div className={styles.like}>
                        <Like story={story}/>
                    </div>
                </div>
                <div className={styles.cardBottom}>
                    <h3>{story.title}</h3>
                    <h6>eftir {story.author}</h6>
                </div>
                
            </div>
        </Link>
    );
}
 
export default StoryCard;