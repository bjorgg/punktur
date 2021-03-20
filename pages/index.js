import styles from "../styles/Home.module.css";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../hooks/user";
import { getStories } from "../db/stories";

import { connectToDatabase } from "../util/mongodb";
import { useRouter } from "next/router";

export default function Home({ stories, speech }) {
    const router = useRouter();
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [user] = useCurrentUser();
    console.log(stories);
    console.log(speech);

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

    // useEffect(() => {
    //   const audio = new Audio(speech);
    //   audio.play();

    // }, [])

    return (
        <div>
            <div className={styles.deleteNotification} style={showDeleteMessage ? { opacity: 1, zIndex: 1} : {}}>
                Notandareikning hefur verið eytt!
            </div>
            {user && `Velkomin/n ${user.username}`}
            {stories &&
                stories.map((story) => (
                    <div key={story._id}>
                        <p>title: {story.title}</p>
                        <p>author: {story.author}</p>
                        {/* <p>text: {story.text}</p> */}
                        <p dangerouslySetInnerHTML={{ __html: story.text }}></p>
                        <p>genre: {story.genre}</p>
                        <a href={`/stories/${story._id}`}>READ</a>
                    </div>
                ))}
        </div>
    );
}

// Connecting to Amazon Polly TTS client
const client = new PollyClient({
    region: process.env.AWS_REGION_MYAPP,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_MYAPP,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MYAPP,
    },
});

// Params for synthesizing speech
const params = {
    OutputFormat: "mp3",
    // Text: "Hæ, ég heiti Dóra. Ég les upp fyrir þig texta.",
    Text: "",
    TextType: "text",
    VoiceId: "Dora",
};

// Command for synthesizing speech
const command = new SynthesizeSpeechCommand(params);

// Getting sever side props from MongoDB and AWS Polly TTS
export async function getServerSideProps(context) {
    // MongoBD
    const { db } = await connectToDatabase();
    const stories = await getStories(db, 20);

    // If no data ... ?

    // AWS Polly TTS
    params.Text = stories.map((story) => {
        return story.text;
    });

    const url = await getSynthesizeSpeechUrl({
        client,
        params,
    });

    // Passing the data receved to the props object
    return {
        props: {
            stories: stories,
            speech: url,
        },

        // Revalidating at most once every second to re-render the page
        // in the background as traffic comes in.
        // revalidate: 1,
    };
}
