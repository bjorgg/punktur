import Link from "next/link";
import { useCurrentUser } from "../hooks/user";

export default function Navbar() {
    const [user, { mutate }] = useCurrentUser();
    const handleLogout = async () => {
        await fetch("/api/auth", {
            method: "DELETE",
        });
        mutate(null);
    };
    return (
        <nav>
            <div>
                {!user ? '' : (
                    <Link href="/ny-saga">
                        <a>Ný saga</a>
                    </Link>
                )}
            </div>
            <Link href="/um-punkt">
                <a>Um punkt</a>
            </Link>
            <div>
                {!user ? '' : (
                    <Link href="/min-sida">
                        <a>Mín síða</a>
                    </Link>
                )}
            </div>
            <div>
                {!user ? (
                    <Link href="/skra-inn">
                        <a>Skrá inn</a>
                    </Link>
                ) : (
                    <a tabIndex={0} role="button" onClick={handleLogout}>
                        Skrá út
                    </a>
                )}
            </div>
            <div>
                {!user ? '' : (
                    <Link href="/stillingar">
                        <a>Stillingar</a>
                    </Link>
                )}
            </div>
        </nav>
    );
}
