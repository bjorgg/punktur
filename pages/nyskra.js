import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "../hooks/user";
import Modal from "../components/modal";


const SignupPage = () => {
    const router = useRouter();
    const [user, { mutate }] = useCurrentUser();
    const [errorMsg, setErrorMsg] = useState("");
    const [isOpen, setModalOpen] = useState(false);
    const [checked, setChecked] = useState(true);
    const [hasAcceptedterms, setHasAcceptedTerms] = useState(false);

    
    // call whenever user changes or signs in
    useEffect(() => {
        // redirect to profile page if user is authenticated
        if (user) router.replace("/min-sida");
    }, [user]);

    // making a POST request to api/users with email, name, passw
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email: e.currentTarget.email.value,
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
            terms: e.currentTarget.terms.value,
        };
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!hasAcceptedterms) {
            setErrorMsg('Það þarf að samþykkja Notendaskilmála til þess að stofna reikning');
        }
        else if (res.status === 201) {
            const userObj = await res.json();
            // writing our user object to the state
            mutate(userObj);
        } else {
            // showing error in form fields
            setErrorMsg(await res.text());
        }
    };

    const handelChecked = () => {
        setChecked(old => !old)
        {checked ? setModalOpen(false) : setModalOpen(true)}
    }


    return (
        <>
            <div>
                <h2>Nýskráning</h2>
                <form onSubmit={handleSubmit}>
                    {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
                    <div>
                        <label htmlFor="username">Nafn/höfundarnafn</label>
                            <input id="username" name="username" type="text"/>
                    </div>
                    <div>
                        <label htmlFor="email">Netfang</label>
                        <input id="email" name="email" type="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Lykilorð</label>
                        <input id="password" name="password" type="password"/>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            id="terms" 
                            name="terms"
                            value={hasAcceptedterms} 
                            onChange={(e) => setHasAcceptedTerms(e.target.value)}
                            checked={!checked}
                            required
                            >
                        </input>
                        <label>Ég hef lesið og samþykki 
                            <a onClick={() => setModalOpen(true)}>Notendaskilmála</a>
                        </label>
                        <Modal 
                            show={isOpen}
                            onSubmit={handelChecked}
                            submitText="Samþykkja"
                            title="Notendaskilmálar"
                            onClose={() => setModalOpen(false)}
                            cancelText="Loka"
                        >
                            <p>Texti um Notendaskilmála Punkts, Má ekki eigna sér annara manna sögur, birta óviðeigandi sögur, við getum eytt þér... blabla</p>
                        </Modal>
                        
                    </div>

                    <button type="submit">Innskrá</button>
                </form>
            </div>
        </>
    );
};

export default SignupPage;
