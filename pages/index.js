import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../hooks/user";
import { getStories } from "../db/stories";
import StoryCard from "../components/StoryCard.js";
import SortByGenres from "../components/SortByGenres.js";
import Hero from "../components/Hero.js";

import { connectToDatabase } from "../util/mongodb";
import { useRouter } from "next/router";

export default function Home({ initialStories }) {
    const router = useRouter();
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [stories, setStories] = useState(initialStories);
    const [user] = useCurrentUser();

    useEffect(() => {
        if (router.query.showUserDeleteMessage) {
            setShowDeleteMessage(true);
            setTimeout(() => {
                router.push("/");
            }, 3000);
        } else if (showDeleteMessage) {
            setShowDeleteMessage(false);
        }
    }, [router.query.showUserDeleteMessage]);

    return (
        <div>
            <div className={styles.deleteNotification} style={showDeleteMessage ? { opacity: 1, zIndex: 1} : {}}>
                Notandareikning hefur verið eytt!
            </div>
            <Hero />
            <div className={styles.rex}>
                <div className={styles.rex1}>
                    {user && `Velkomin/n ${user.username}`}
                    <SortByGenres setStories={setStories} />
                </div>
                <div className={styles.rex2}>
                    {Array.isArray(stories) && stories.map((story) => (
                        <StoryCard story={story} key={story._id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}


// Getting sever side props from MongoDB
export async function getServerSideProps(context) {
    const { db } = await connectToDatabase();
    const stories = await getStories(db, 20);

    // If no data ... ?   

    // Passing the data receved to the props object
    return {
        props: {
            initialStories: stories,
        },

        // revalidate: 1,
    };
}
