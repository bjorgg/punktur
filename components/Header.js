import Link from "next/link";
import Image from 'next/image';
import styles from "../styles/Header.module.css";
import { useCurrentUser } from "../hooks/user";
import { useRouter } from "next/router";


export default function Header() {
    const [user, { mutate }] = useCurrentUser();
    const router = useRouter();
    
    // fetching delete request from api/auth
    const handleLogout = async () => {
        const res = await fetch("/api/auth", {
            method: "DELETE",
        });
        if(res.ok) {
            router.push("/?showLogOutMessage=true")
        }
        // setting user state to null
        mutate(null);
    }
    
    return (
        <header className={styles.header}>
            <div className={styles.logoHeim}>
                <Link href="/">
                    <a>
                    <Image src="/img/logo_punktur_horizontal.png"  width={160} height={32.2} alt="logo"/>
                    </a>
                </Link>
            </div>
            <nav className={styles.nav}>
                <div className={styles.skra}>
                    {!user ? '' : (
                        <Link href="/min-sida">
                            <div className={styles.user}>
                                <Image  
                                    src="/Icons/UserHeader.svg"
                                    alt="mín síða"
                                    width={32}
                                    height={32}/>
                                <h5>Prófíll</h5>
                            </div>
                        </Link>
                    )}
                     {!user ? '' : (
                         <Link href="/ny-saga" >
                            <div className={styles.write}>
                                <Image  
                                    src="/Icons/writeHeader.svg"
                                    alt="Ný saga"
                                    width={32}
                                    height={32}/>
                                <h5>Ný saga</h5>
                            </div>
                        </Link>
                    )}
                    {!user ? (
                        <Link href="/skra-inn">
                            <div>
                                <Image  
                                    src="/Icons/SignIn.svg"
                                    alt="skrá inn"
                                    width={32}
                                    height={32}/>
                                <h5>Skrá Inn</h5>
                                </div>
                        </Link>
                    ) : (
                        <a tabIndex={0} role="button" onClick={handleLogout}>
                            <div>
                                <Image  
                                    src="/Icons/SignOut.svg"
                                    alt="skrá út"
                                    width={32}
                                    height={32}/>
                                <h5>Skrá Út</h5>
                            </div>
                        </a>
                    )}
                    
                </div>
            </nav>
        </header>
    );
}