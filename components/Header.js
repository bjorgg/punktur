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
                    {!user ? (
                        <Link href="/skra-inn">
                            {/* <a>Skrá inn</a> */}
                            <Image  
                                src="/Icons/SignIn.svg"
                                alt="skrá inn"
                                width={32}
                                height={32}/>
                        </Link>
                    ) : (
                        <a tabIndex={0} role="button" onClick={handleLogout}>
                            {/* Skrá út */}
                            <Image  
                                src="/Icons/SignOut.svg"
                                alt="skrá út"
                                width={32}
                                height={32}/>
                        </a>
                    )}
                </div>
                <div>
                    {!user ? '' : (
                        <Link href="/stillingar">
                            {/* <a>Stillingar</a> */}
                            <Image  
                                src="/Icons/stillingar.svg"
                                alt="Stillingar"
                                width={32}
                                height={32}/>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}