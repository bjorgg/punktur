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
                        <label className={styles.TermsContainer}>
                            <a onClick={() => setModalOpen(true)}>
                                <p>Ég hef lesið og samþykki Notendaskilmála</p>
                            </a>                            
                            <input 
                                type="checkbox" 
                                id="terms" 
                                name="terms" 
                                checked={hasAcceptedterms} 
                                // checked="checked" 
                                onChange={() => setHasAcceptedTerms(!hasAcceptedterms)}
                                >
                            </input>
                            <span className={styles.TermCheckmark}></span>
                        </label>

                    </div>
                    <div className={styles.buttonDiv}>
                       <button type="submit">Nýskrá</button> 
                    </div>
                </form>
                <Modal 
                    show={isOpen} 
                    onSubmit={handelChecked} 
                    submitText="Samþykkja" 
                    title="Notendaskilmálar" 
                    onClose={() => setModalOpen(false)} 
                    cancelText="Loka">
                    <div>
                        <p>Punktur (hér eftir “Punktur”, “við” eða “okkar”) býður upp á forrit sem gerir þér (hér eftir nefnt “þú” eða “notandi”) kleift að fá aðgang að sögum eftir aðra notendur í gegnum vafra.</p>
                        <p>Með því að stofna reikning hjá Punkt ert þú að gera bindandi samning við Punkt og samþykkir að fara eftir þessum notendaskilmálum.</p>
                        <p>1. Allar sögur sem eru birtar falla undir höfundarrétt notenda. Ekki er leyfilegt að stela, afrita og birta sögur frá öðrum notendum undir sínu nafni. Punktur hefur rétt á að eyða þeim sögum sem ekki fylgja þessari reglu.</p>
                        <p>2. Sögur sem innihalda ítarlegar lýsingar af óviðeigandi umræðuefnum eru ekki leyfðar. Punktur hefur rétt á að eyða þeim sögum sem ekki fylgja þessari reglu.</p>
                        <p>3. Notendur hafa ekki leyfi fyrir því að hlaða inn nektarmyndum eða annarskonar óviðeigandi myndum sem prófílmynd. Punktur hefur rétt á að eyða aðgöngum sem ekki fylgja þessari reglu.</p>
                        <p>4. Þessir notendaskilmálar hafa þá undantekningu að geta breyst með tímanum.</p>
                        <p>Síðast yfirfarið 24 mars 2021</p>
                        <p>Punktur ehf.</p>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default SignupPage;
