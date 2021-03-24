import { useCurrentUser } from "../hooks/user";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import styles from '../styles/Like.module.css';


const Like = ({story}) => {
    const [ currentStory, setCurrentStory ] = useState(story);
    const [ userLikesStory, setUserLikesStory ] = useState();
    const [user, {mutate}] = useCurrentUser();

    useEffect(() => {
        if(!Array.isArray(currentStory.likes)){
            setCurrentStory({...currentStory, likes: []});
        }
    }, []);

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

        //Pre-emptive status update
        setUserLikesStory(newUserLikesStory);

        // Compose new liked stories for the user
        const likedStoriesCopy = user.likedStories.slice(0);
        
        if(newUserLikesStory) { // add story to the array
            likedStoriesCopy.push(story._id);
        } else { // remove a story from the array
            const i = likedStoriesCopy.indexOf(story._id)
            if(i < 0) return
            likedStoriesCopy.splice(i, 1);
        } 

        

        // Create formdata for user patch
        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.username);
        formData.append("likedStories", JSON.stringify(likedStoriesCopy));
         // Update User
         const userRes = await fetch("api/user", {
            method: "PATCH",
            body: formData
        });

        // If the user was not updated, return
        if (userRes.status !== 200) {
            console.log("Error on user update") 
            setUserLikesStory(!newUserLikesStory);
            return
        } 

        // Update user data
        const data = await userRes.json(); 
        mutate(data) // Changing the user data inside the app
    
        // Compose story patch payload
        const storyLikesCopy = currentStory.likes.slice(0);
        if (newUserLikesStory) {
            storyLikesCopy.push(user._id)
        } else {
            const i = storyLikesCopy.indexOf(user._id)
            if(i< 0) return
            storyLikesCopy.splice(i, 1);
        }
        
        const storyRes = await fetch("api/story", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({_id: currentStory._id, likes: storyLikesCopy})
        });

        if (storyRes.status !== 200) {
            console.log("Error on story update")
            setUserLikesStory(!newUserLikesStory); 
            return
        } 

        setCurrentStory({...currentStory, likes: storyLikesCopy})
    };

    
    return ( 
        <div className={styles.container}>
            {!user ? '' : (
                <div className={styles.likes}>
                    <p>{!!currentStory.likes && currentStory.likes.length}</p> 
                    <Image 
                    onClick={ () => handleLike(!userLikesStory)} 
                    className={userLikesStory ? styles.active : styles.star } 
                    src="/img/stjarna.svg"  
                    width={24} 
                    height={24} 
                    alt="stjarna"/>
                </div>
            )}
        </div>
    );
}



 
export default Like;