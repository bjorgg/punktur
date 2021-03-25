import Link from "next/link";
import styles from '../styles/Hero.module.css';
import { useCurrentUser } from "../hooks/user";

const Hero = () => {
    const [user] = useCurrentUser();
    return ( 
        <div>
            {user ? '' : (
                <div>

                    <div className={styles.div}>
                    </div>

                    <div className={styles.heroWrapper}>
                    
                        <div className={styles.heroContainer}>
                            <h1>Hvað dettur þig í hug?</h1>
                            <h4>Deildu þinni smásögu með landinu!</h4>
                        </div>

                        <Link href="/skra-inn">
                            <button className={styles.callToAction}>Byrja að skrifa</button>
                        </Link>
            
                    </div>

                </div>
            )}
        </div>
     );
}



 
export default Hero;