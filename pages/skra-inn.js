import { useState } from "react";

export default function LogIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const loginUser = async () => {
        setEmailError('')
        setPasswordError('')
        if (!email) {
            setEmailError("insert email")
        } else if (!password) {
            setPasswordError("insert password")
        } else {
            const result = await fetch("http://localhost:3000/api/loginUser", {
                method: "post",
                body: JSON.stringify({email, password})
            });
            const loggedInUser = await result.json();
            if (loggedInUser) {
                window.location.href = "/min-sida";
            } else {
                setEmailError('Not found')
            }
        }
    }


    return (
        <div>
            <h2>Login</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    loginUser();
                }}
            >
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    {emailError && <p>{emailError}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    {passwordError && <p>{passwordError}</p>}
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}
