import { useState } from "react";
import { useCurrentUser } from "../hooks/user";
import { getStories } from "../db/stories";
import StoryCard from "../components/StoryCard.js";
import SortByGenres from "../components/SortByGenres.js";
import styles from "../styles/Home.module.css";
import Hero from "../components/Hero.js";

import { connectToDatabase } from "../util/mongodb";

export default function Home({ initialStories }) {
    const [stories, setStories] = useState(initialStories);
    const [user] = useCurrentUser();

    return (
        <div>
            <Hero />
            <div className={styles.rex}>
                <div className={styles.rex1}>
                    <h5>{user && `Hæ ${user.username}!`}</h5>
                    <SortByGenres setStories={setStories} />
                </div>
                <div className={styles.rex2}>
                    {Array.isArray(stories) && stories.map((story) => <StoryCard story={story} key={story._id} />)}
                </div>
            </div>
        </div>
    );
}

// Getting sever side props from MongoDB
export async function getServerSideProps(context) {
    const { db } = await connectToDatabase();
    const stories = await getStories(db, 20);

    // Passing the data receved to the props object
    return {
        props: {
            initialStories: stories,
        },

        revalidate: 1,
    };
}
