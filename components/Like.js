import { useCurrentUser } from "../hooks/user";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import styles from '../styles/Like.module.css';


const Like = ({story}) => {

    const [ userLikesStory, setUserLikesStory ] = useState();
    // const [isActive, setActive] = useState("false");

    const [user, mutate] = useCurrentUser();

    useEffect(()=> {

        if(!user)return
        // make sure user has liked stories
        if(!Array.isArray(user.likedStories)){
            user.likedStories = []
        }

        if(user.likedStories.includes(story._id)) {
            setUserLikesStory(true);
        }

    }, [user] );


    const handleLike = async (e) =>  {

        e.preventDefault();

        const likedStoriesCopy = user.likedStories.slice(0);

        console.log(story, user);
        
        if(userLikesStory) { // remove a story from the array
            
        } else { // add a story to the array

        }

        // Update user with new stories array
    
        const res = await fetch("api/user", {
            method: "PATCH",
            body: JSON.stringify({
                likedStories: likedStoriesCopy,
            }),
        });
        if (res.status === 200) {
            const data = await res.json();
            mutate(data)
        } else if (res.status === 500) {
            setMsg({ message: "Eitthvað fór úrskeiðis, reyndu aftur", isError: true });
        } else {
            setMsg({ message: await res.text(), isError: true });
        }

    };

    
    return ( 
        <div>
            {!user ? '' : (
                
                <div >
                    <p>{story.Likes}</p>
                    <button onClick={handleLike} className={userLikesStory ? "active" : "star"}>
                        <Image src="/img/stjarna.svg"  width={30} height={30} alt="stjarna"/>
                    </button>
                </div>

            )}

        </div>
    );
}



 
export default Like;