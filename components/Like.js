import { useCurrentUser } from "../hooks/user";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import styles from '../styles/Like.module.css';


const Like = ({story}) => {

    console.log("story", story.likes)

    const [ userLikesStory, setUserLikesStory ] = useState();
    // const [isActive, setActive] = useState("false");

    const [user, {mutate}] = useCurrentUser();

    useEffect(()=> {
        if(!user)return

        // make sure user has liked stories
        if(!Array.isArray(user.likedStories)){
            user.likedStories = []
        }

        if(user.likedStories.includes(story._id)) {
            setUserLikesStory(true);
        } else {
            setUserLikesStory(false);
        }

    }, [user] );

    const handleLike = async (newUserLikesStory) =>  {

        setUserLikesStory(newUserLikesStory);

        const likedStoriesCopy = user.likedStories.slice(0);

        
        if(newUserLikesStory) { // add story to the array
            likedStoriesCopy.push(story._id);
        } else { // remove a story from the array
            let i = likedStoriesCopy.indexOf(story._id)
            if(i < 0) return
            likedStoriesCopy.splice(i, 1);
        } 

        // NEED A WAY To COUNT LIKES ON A SINGLE STORY FROM MANY USERS AND DISPLAY THE NUMBER NEXT TO THE STAR
        // Update user with new stories array
    
        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.username);
        formData.append("likedStories", JSON.stringify(likedStoriesCopy));

        const res = await fetch("api/user", {
            method: "PATCH",
            body: formData
        });

        if (res.status === 200) {
            const data = await res.json();
            mutate(data)
        } else if (res.status === 500) {
            return
        } else {
            return
        }
    };

    
    return ( 
        <div>
            {!user ? '' : (
                
                <div >
                    <p>{story.Likes}</p> 
                    <Image onClick={ () => handleLike(!userLikesStory)} className={userLikesStory ? styles.active : styles.star } src="/img/stjarna.svg"  width={20} height={20} alt="stjarna"/>
                </div>

            )}

        </div>
    );
}



 
export default Like;