import { useState } from "react";

export default function SignUp() {
    const handleCreate = async () => {
        if (!hasAcceptedTerms) {
            console.log("ACCEPT TERMS!");
        } else if (password !== passwordAgain) {
            console.log("PASSWORDS DONT MATCH!");
        } else {
            const result = await fetch("http://localhost:3000/api/createUser", {
                method: "post",
                body: JSON.stringify({ username, email, password }),
            });
            const savedUser = await result.json();
            alert('Account created');
            window.location.href = "/login";
            console.log("CREATED!", savedUser);
        }
    };

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCreate();
                }}
            >
                <div>
                    <label>Nafn</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label>Password again</label>
                    <input type="password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)}></input>
                </div>
                <div>
                    <label>Terms of use</label>
                    <input type="checkbox" value={hasAcceptedTerms} onChange={(e) => setHasAcceptedTerms(e.target.value)}></input>
                </div>
                <button type="submit">Skrá</button>
            </form>
        </div>
    );
}

/* export default async function handler(req, res){
    const {db} = await connectToDatabase();

    const data = req.query;

    const response = await db.collection('users').insertOne(data)

    res.json(response);
} */
