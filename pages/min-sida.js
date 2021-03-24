import { useEffect, useState } from 'react';
import { useCurrentUser } from "../hooks/user";
import Image from 'next/image';
import Link from 'next/link';
import Modal from '../components/modal';
import StoryCard from "../components/StoryCard.js";
import styles from  '../styles/minSida.module.css';


export default function Profile() {
    const [user] = useCurrentUser();
    const [stories, setStories] = useState([]);
    const [isOpen, setModalOpen] = useState(false);
    const [activeStory, setActiveStory] = useState([])
    const defaultAvatar = '/avatar.svg'

    useEffect(() => {
        fetch('/api/userStories').then(res => res.json()).then(res => {
            setStories(res.userStories);
        })
    }, [])

    const {
        username, email, bio, avatar
    } = user || {};

    const handleDelete = async () => {
        if (!activeStory) return

        try {
          const res = await fetch('/api/story', {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({_id: activeStory._id})
            }
          );
          setModalOpen(false);
          setActiveStory(null)
          const data = await res.json();
          console.log(data)
          alert('Story deleted'); // Success modal í staðinn fyrir alert ...
        } catch (err) {
          console.log(err);
        }
    
      };
      const handleModal = (story) => {
        setModalOpen(true)
        setActiveStory(story)
      }

    return (
        <div>
            {!user ? 'Þú hefur skráð þig út' : (
                <div>
                    <div>
                        <div className={styles.minStilling}>
                            <h2>Mín síða</h2>
                            <div className={styles.stilling}>
                                <Link href="/stillingar">
                                    {/* <a>Stillingar</a> */}
                                    <Image  
                                        src="/Icons/stillingar.svg"
                                        alt="Stillingar"
                                        width={32}
                                        height={32}/>
                                </Link>
                            </div>
                        </div>
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
                            <div key={story._id}>
                                <StoryCard story={story}/>
                                <div>
                                    <Link href={`/breyta-sogu/${story._id}`}>
                                        <a><Image src="/Icons/edit.svg"  width={30} height={30} alt="blýantur"/></a>
                                    </Link>                                   
                                    <Image src="/Icons/Trash.svg"  width={30} height={30} alt="rusl" onClick={() => handleModal(story)}/>           
                                </div>
                            </div>
                        ))} 
                    </div>
                    <Modal 
                        show={isOpen} 
                        onSubmit={handleDelete} 
                        submitText="Staðfesta" 
                        title="Eyða sögu!" 
                        onClose={() => setModalOpen(false)} 
                        cancelText="Hætta við">
                        <p>Þú ert að fara að eyða sögunni þinni!</p>
                    </Modal>
                </div> 
                
            )}
        </div>
    )
}
