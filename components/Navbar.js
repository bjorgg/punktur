import Link from "next/link";

export default function Navbar() {
    
    return (
        <nav>
            <Link href="/ny-saga"><a>Ný saga</a></Link>
            <Link href="/um-punkt"><a>Um punkt</a></Link>
            <Link href="/skra-inn"><a>Skrá inn</a></Link>
        </nav>
    );
}