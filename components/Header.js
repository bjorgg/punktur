import Link from "next/link";
import Image from 'next/image';
import styles from "../styles/Header.module.css";

export default function Header() {
    
    return (
        <header>
            <Link href="/">
                <a>
                <Image src="/img/logo_punktur_horizontal.png"  width={160} height={32.2} alt="logo"/>
                </a>
            </Link>
        </header>
    );
}