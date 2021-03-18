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
            <Link href="/ny-saga">
                <a>Ný saga</a>
            </Link>
            <Link href="/um-punkt">
                <a>Um punkt</a>
            </Link>
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
        </nav>
    );
}
