import Link from "next/link";
import styles from '../styles/StoryCard.module.css';


const StoryCard = ({story}) => {
    return ( 
      
        <Link href={`/stories/${story._id}`}>
            <div className={styles.cardWrapper}> 
                <div className={styles.cardTop}>
                    <p>genre:{story.genres}</p>
                    <div>
                        <p>25</p>
                        <p>⭐</p>
                    </div>
                </div>
                <div>
                    <p>title: {story.title}</p>
                    <p>author: {story.author}</p>
                </div>
            </div>
        </Link>
    );
}
 
export default StoryCard;