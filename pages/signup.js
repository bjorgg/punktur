import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "../hooks/user";

const SignupPage = () => {
    const router = useRouter();
    const [user, { mutate }] = useCurrentUser();
    const [errorMsg, setErrorMsg] = useState("");
    useEffect(() => {
        // redirect to home if user is authenticated
        if (user) router.replace("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email: e.currentTarget.email.value,
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        };
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (res.status === 201) {
            const userObj = await res.json();
            mutate(userObj);
        } else {
            setErrorMsg(await res.text());
        }
    };

    return (
        <>
            <div>
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
                    <label htmlFor="username">
                        <input id="username" name="username" type="text" placeholder="Your name" />
                    </label>
                    <label htmlFor="email">
                        <input id="email" name="email" type="email" placeholder="Email address" />
                    </label>
                    <label htmlFor="password">
                        <input id="password" name="password" type="password" placeholder="Create a password" />
                    </label>
                    <button type="submit">Sign up</button>
                </form>
            </div>
        </>
    );
};

export default SignupPage;
