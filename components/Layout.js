import styles from '../styles/Layout.module.css'
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    
    return (
        <>
            <div className={styles.headerWrapper}>
                <Header/>
                <Navbar />
            </div>
            { children }
            <Footer />
        </>
    )
}