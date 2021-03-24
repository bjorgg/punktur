import Link from "next/link";
import Image from 'next/image';
import styles from "../styles/Header.module.css";
import { useCurrentUser } from "../hooks/user";


export default function Header() {
    const [user, { mutate }] = useCurrentUser();
    
    // fetching delete request from api/auth
    const handleLogout = async () => {
        await fetch("/api/auth", {
            method: "DELETE",
        });
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
                                <p>Síðan mín</p>
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
                            <p>Ný saga</p>
                            </div>
                        </Link>
                    )}
                    {!user ? (
                        <Link href="/skra-inn">
                            {/* <a>Skrá inn</a> */}
                            <Image  
                                src="/Icons/SignIn.svg"
                                alt="skrá inn"
                                width={32}
                                height={32}/>
                            <p>Skrá Inn</p>
                        </Link>
                    ) : (
                        <a tabIndex={0} role="button" onClick={handleLogout}>
                            {/* Skrá út */}
                            <Image  
                                src="/Icons/SignOut.svg"
                                alt="skrá út"
                                width={32}
                                height={32}/>
                        <p>Skrá Út</p>
                        </a>
                    )}
                    
                </div>
            </nav>
        </header>
    );
}