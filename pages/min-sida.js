import { useCurrentUser } from "../hooks/user";
import Image from 'next/image'
import StoryCard from "../components/StoryCard.js";
import { useEffect, useState } from 'react'

export default function Profile() {
    const [user] = useCurrentUser();
    const [stories, setStories] = useState([]);
    const defaultAvatar = '/avatar.svg'

    useEffect(() => {
        fetch('/api/userStories').then(res => res.json()).then(res => {
            setStories(res.userStories);
        })
    }, [])

    const {
        username, email, bio, avatar
    } = user || {};

    return (
        <div>
            {!user ? 'Þú hefur skráð þig út' : (
                <div>
                    <div>
                        <h2>Mín síða</h2>
                        <h3>{user && `Velkomin/n ${user.username}!`}</h3>
                    </div>
                    <div>
                        <div>
                        {!avatar ? 
                                <Image
                                    src={defaultAvatar}
                                    alt="Avatar"
                                    width={100}
                                    height={100}
                                /> :
                                <img 
                                    src={avatar} 
                                    width="100" 
                                    height="100" 
                                    alt={username} 
                                />
                            }
                        </div>
                        <p>{username}</p>
                        <p>{email}</p>
                        <div>
                            <h3>Um mig</h3>
                            <p>{bio}</p>
                        </div>
                    </div>
                    <div>
                        <h3>Mínar sögur</h3>
                        {Array.isArray(stories) && stories.map((story) => (
                            <StoryCard story={story} key={story._id}/>
                        ))} 
                    </div>
                </div> 
            )}
        </div>
    )
}
