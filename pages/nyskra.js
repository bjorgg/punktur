import styles from "../styles/Form.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "../hooks/user";
import Modal from "../components/modal";
import Image from 'next/image'



const SignupPage = () => {
    const router = useRouter();
    const [user, { mutate }] = useCurrentUser();
    const [errorMsg, setErrorMsg] = useState("");
    const [isOpen, setModalOpen] = useState(false);
    const [hasAcceptedterms, setHasAcceptedTerms] = useState(false);

    // call whenever user changes or signs in
    useEffect(() => {
        // redirect to profile page if user is authenticated
        if (user) router.replace("/");
    }, [user]);

    // making a POST request to api/users with email, name, passw
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email: e.currentTarget.email.value,
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        };
        if (!hasAcceptedterms) {
            setErrorMsg("Það þarf að samþykkja Notendaskilmála til þess að stofna reikning");
            return;
        } 
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (res.status === 201) {
            const userObj = await res.json();
            // writing our user object to the state
            mutate(userObj);
        } else {
            // showing error in form fields
            setErrorMsg(await res.text());
        }
    };

    const handelChecked = () => {
        setHasAcceptedTerms(true);
        setModalOpen(false);
    };

    return (
        <>
            <div>
            <div className={styles.formHeader}>    
                <Image
                    className={styles.dotLogo}
                    src='/img/dot.png'
                    alt="Punktur"
                    width={80}
                    height={80}
                /> 
            </div>
                
                <form onSubmit={handleSubmit}>
                    {errorMsg ? <h5 style={{ color: "#D94D11" }}>{errorMsg}</h5> : null}
                    <div>
                        <label htmlFor="username">
                            <h5>Nafn/höfundarnafn</h5>
                        </label>
                        <input className={styles.formInput} id="username" name="username" type="text" />
                    </div>
                    <div>
                        <label htmlFor="email">
                            <h5>Netfang</h5>
                        </label>
                        <input className={styles.formInput} id="email" name="email" type="email" />
                    </div>
                    <div>
                        <label htmlFor="password">
                            <h5>Lykilorð</h5>
                        </label>
                        <input className={styles.formInput} id="password" name="password" type="password" />
                    </div>
                    <div className={styles.formTerms}>
                        <input 
                            className={styles.checkbox}
                            type="checkbox" 
                            id="terms" 
                            name="terms" 
                            checked={hasAcceptedterms} 
                            onChange={() => setHasAcceptedTerms(!hasAcceptedterms)}
                            >
                        </input>
                        <a onClick={() => setModalOpen(true)}>
                            <p>Ég hef lesið og samþykki Notendaskilmála</p>
                        </a>
                    </div>
                    <button type="submit">Nýskrá</button>
                </form>
                <Modal 
                    show={isOpen} 
                    onSubmit={handelChecked} 
                    submitText="Samþykkja" 
                    title="Notendaskilmálar" 
                    onClose={() => setModalOpen(false)} 
                    cancelText="Loka">
                    <p>Texti um Notendaskilmála Punkts, Má ekki eigna sér annara manna sögur, birta óviðeigandi sögur, við getum eytt þér... blabla</p>
                </Modal>
            </div>
        </>
    );
};

export default SignupPage;
