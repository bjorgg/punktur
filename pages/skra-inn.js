import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCurrentUser } from "../hooks/user";

const LoginPage = () => {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");
    const [user, { mutate }] = useCurrentUser();
    useEffect(() => {
        // redirect to home if user is authenticated
        if (user) router.push("/min-sida");
    }, [user]);

    async function onSubmit(e) {
        e.preventDefault();
        const body = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        };
        const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (res.status === 200) {
            const userObj = await res.json();
            mutate(userObj);
        } else {
            setErrorMsg("Rangt netfang eða lykilorð, reyndu aftur!");
        }
    }

    return (
        <>
            <h2>Innskráning</h2>
            <form onSubmit={onSubmit}>
                {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
                <label htmlFor="email">Netfang
                    <input id="email" type="email" name="email" placeholder="Netfang" />
                </label>
                <label htmlFor="password">Lykilorð
                    <input id="password" type="password" name="password" placeholder="Lykilorð" />
                </label>
                <button type="submit">Ská inn</button>
                <div>
                    <Link href="/nyskra">
                        <a>Stofna reikning</a>
                    </Link>
                </div>
            </form>
        </>
    );
};

export default LoginPage;
