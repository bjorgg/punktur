import { useCurrentUser } from "../hooks/user";
import Image from 'next/image'
import MyLink from "./MyLink";
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
    const [user, { mutate }] = useCurrentUser();
    
    return (
        <div>
        {!user ? '' : (
            <nav className={styles.nav}>
                {!user ? '' : (
                    <MyLink href="/">
                        <div className={styles.logo}>
                            <Image  
                                src="/Icons/navbarLogo.svg"
                                alt="heim"
                                width={32}
                                height={32}/>
                        </div>
                    </MyLink>
                )}
                {!user ? '' : (
                    <MyLink href="/ny-saga" className={styles.abc} >
                        <div className={styles.write}>
                            <Image  
                                src="/Icons/write.svg"
                                alt="Ný saga"
                                width={32}
                                height={32}/>
                        </div>
                    </MyLink>
                )}
                {!user ? '' : (
                    <MyLink href="/min-sida">
                        <div className={styles.user}>
                            <Image  
                                src="/Icons/User.svg"
                                alt="mín síða"
                                width={32}
                                height={32}/>
                        </div>
                    </MyLink>
                )}
                
            </nav>
        )}
        </div>
    );
}
