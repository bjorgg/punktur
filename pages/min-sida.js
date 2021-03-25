import { useEffect, useState } from 'react';
import { useCurrentUser } from "../hooks/user";
import Image from "next/image";
import StoryCard from "../components/StoryCard.js";
import Link from "next/link";
import Modal from "../components/modal";
import styles from "../styles/Profile.module.css";
import { useRouter } from "next/router";

export default function Profile() {
    const [user] = useCurrentUser();
    const [stories, setStories] = useState([]);
    const [isOpen, setModalOpen] = useState(false);
    const [activeStory, setActiveStory] = useState([]);
    const defaultAvatar = "/avatar.svg";
    const router = useRouter();

    useEffect(() => {
        fetch("/api/userStories")
            .then((res) => res.json())
            .then((res) => {
                setStories(res.userStories);
            });
    }, []);

    const { username, email, bio, avatar } = user || {};

    const handleDelete = async () => {
        if (!activeStory) return;

        try {
            const res = await fetch("/api/story", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: activeStory._id }),
            });
            setModalOpen(false);
            setActiveStory(null);
            const data = await res.json();
            if (data.deleted) {
                setStories(stories.filter((story) => story._id !== activeStory._id));
                router.push("/min-sida?showStoryDeleteMessage=true");
            }
        } catch (err) {
            console.log(err); 
        }
    };
    const handleModal = (story) => {
        setModalOpen(true);
        setActiveStory(story);
    };

    return (
        <div>
            {!user ? (
                ""
            ) : (
                <div className={styles.profilePage}>
                    <div className={styles.aboutDiv}>
                        <div className={styles.avatarDiv}>
                            {!avatar ? 
                                <Image
                                    src={defaultAvatar}
                                    className={styles.avatar}
                                    alt="Avatar"
                                    width={100}
                                    height={100}
                                /> :
                                <img
                                    className={styles.avatar}
                                    src={avatar} 
                                    width="100" 
                                    height="100" 
                                    alt={username} 
                                />
                            }
                        </div>
                        <div>
                            <div className={styles.minStilling}>
                                <h4>{username}</h4>  
                                <div className={styles.stilling}>
                                    <Link href="/stillingar">
                                        <Image  
                                            src="/Icons/stillingar.svg"
                                            alt="Stillingar"
                                            width={32}
                                            height={32}/>
                                    </Link>
                                </div>
                            </div>
                            <p className={styles.bio}>{bio}</p>
                        </div>
                    </div>
                    <div className={styles.myStories}>
                        <div className={styles.myStoriesHeader}>
                            <h4 >Mínar sögur</h4>
                        </div>
                        {Array.isArray(stories) &&
                            stories.map((story) => (
                                <div className={styles.storyContainer} key={story._id}>
                                    <StoryCard story={story} />
                                    <div className={styles.storyEditDiv}>
                                        <button className={styles.iconButton}>
                                            <Link  href={`/breyta-sogu/${story._id}`}>
                                            <a>
                                                <Image 
                                                src="/Icons/edit.svg" width={30} height={30} alt="blýantur" />
                                            </a>
                                        </Link>
                                        </button>
                                        <button className={styles.iconButton}>
                                            <Image className={styles.storyEditDiv} src="/Icons/Trash.svg" width={30} height={30} alt="rusl" onClick={() => handleModal(story)} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <Modal show={isOpen} onSubmit={handleDelete} submitText="Staðfesta" title="Eyða sögu!" onClose={() => setModalOpen(false)} cancelText="Hætta við">
                        <p>Þú ert að fara að eyða sögunni þinni!</p>
                    </Modal>
                </div>
            )}
        </div>
    );
}
