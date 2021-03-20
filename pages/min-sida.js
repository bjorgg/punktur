import { useCurrentUser } from "../hooks/user";
import Image from 'next/image'

import Link from "next/link";


export default function Profile() {
    const [user] = useCurrentUser();

    const {
        username, email, bio,
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
                            <Image
                                src="/avatar.svg"
                                alt="Avatar"
                                width={100}
                                height={100}
                            />
                        </div>
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
