import { useCurrentUser } from "../hooks/user";
import Link from "next/link";


export default function Profile() {
    const [user] = useCurrentUser();

    return (
        <div>
            {!user ? 'Þú hefur skráð þig út' : (
                <div>
                    <div>
                        <h2>Mín síða</h2>
                        <h3>{user && `Velkomin/n ${user.username}!`}</h3>
                    </div>
                    <div>
                        <p>Hér kemur frófílmynd</p>
                        <p>{user.username}</p>
                        <p>Hér kemur um notanda text?</p>
                    </div>
                    <div>
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
