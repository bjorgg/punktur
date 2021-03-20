import Link from "next/link";
import styles from '../styles/Hero.module.css';
import { useCurrentUser } from "../hooks/user";

const Hero = () => {
    const [user] = useCurrentUser();
    return ( 
        <div>
            {user ? '' : (
                <div className={styles.heroContainer}>
                    
                    <div>
                        <h1>Hvað dettur þér í hug?</h1>
                        <h2>Deildu þinni smásögu með landinu!</h2>
                    </div>
                    <Link href="/skra-inn">
                        <a>Byrja að skrifa</a>
                    </Link>
            
                </div>
            )}
        </div>
     );
}


 
export default Hero;