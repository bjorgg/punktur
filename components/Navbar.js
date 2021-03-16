import Link from "next/link";

export default function Navbar() {
    
    return (
        <nav>
            <Link href="/newStory"><a>Ný saga</a></Link>
            <Link href="/about"><a>Um punkt</a></Link>
            <Link href="/login"><a>Skrá inn</a></Link>
        </nav>
    );
}