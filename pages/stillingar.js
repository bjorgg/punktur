import { useCurrentUser } from "../hooks/user";
import Link from "next/link";


export default function Settings() {
    const [user] = useCurrentUser();

    return (
        <div>
            {!user ? 'Þú hefur skráð þig út' : (
                <div>
                    <div>
                        <Link href="/min-sida">
                            <a>Til baka</a>
                        </Link>
                        <h2>Stillingar</h2>
                        <p>{user.username}</p>
                    </div>
                    <div>
                        <h3>Velja Prófílmynd</h3>
                        <p>Hér koma prófílmyndir</p>
                    </div>
                    <div>
                        <h3>Nafn/Höfundarnafn</h3>
                        <p>breyta nafni hér</p>
                    </div>
                    <div>
                        <h3>Um mig</h3>
                        <p>breyta um hér</p>
                    </div>
                    <div>
                        <button>Vista Breytingar</button>
                    </div>
                    <div>
                        <button>Eyða aðgangi</button>
                    </div>
                </div> 
            )}
        </div>
    )
}