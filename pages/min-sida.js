import { useCurrentUser } from "../hooks/user";
import Link from "next/link";


export default function Profile() {
    const [user] = useCurrentUser();

    const {
        username, email, bio, profilePicture,
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
                        {profilePicture ? (
                            <img src={profilePicture} width="256" height="256" alt={username} />
                        ) : null}
                        </div>
                        <p>Hér kemur frófílmynd</p>
                        <p>{username}</p>
                        <p>{email}</p>
                    <div>
                        <h3>Um mig</h3>
                        <p>{bio}</p>
                    </div>
                    </div>
                    <div>
                        <h3>Mínir flokkar</h3>
                        <p>Hér koma tögg</p>
                    </div>
                    <div>
                        <h3>Mínar sögur</h3>
                        <p>Hér koma Sögur notendans</p>
                    </div>
                </div> 
            )}
        </div>
    )
}
