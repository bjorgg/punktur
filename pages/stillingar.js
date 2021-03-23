import styles from "../styles/Form.module.css";
import { useCurrentUser } from "../hooks/user";
import React, { useState, useEffect, useRef } from "react";
import Modal from "../components/modal";
import Image from 'next/image'
import { useRouter } from "next/router";
import Link from "next/link";

export default function Settings() {
    const router = useRouter();
    const [user] = useCurrentUser();
    const [isOpen, setModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const formRef = useRef();
    const [msg, setMsg] = useState({ message: "", isError: false });
    const defaultAvatar = '/avatar.svg'


    useEffect(() => {
        // initializing user data in form input
        if (formRef.current) {
            const form = formRef.current;
            form.email.value = user.email;
            form.username.value = user.username;
            form.bio.value = bio.username ?? "";
        }
    }, [user]);
    // read data from form to be saved
    const getFormData = () => {
        const form = formRef.current;
        let avatar = null;
        console.log(form.avatar.files)
        if (form.avatar.files[0]) {
            avatar = form.avatar.files[0];
        }
        console.log({avatar})
        const formData = new FormData();
        formData.append("email", form.email.value);
        formData.append("username", form.username.value);
        formData.append("bio", form.bio.value);
        formData.append("avatar", avatar);
        return formData;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // disable submitting while updating is in progress
        if (isUpdating) return;
        setIsUpdating(true);
        console.log(user);

        const res = await fetch("api/user", {
            method: "PATCH",
            body: getFormData(),
        });
        if (res.status === 200) {
            setMsg({ message: "Prófíll uppfærður" });
        } else if (res.status === 500) {
            setMsg({ message: "Eitthvað fór úrskeiðis, reyndu aftur", isError: true });
        } else {
            setMsg({ message: await res.text(), isError: true });
        }
        setIsUpdating(false);
    };

    const handleDeleteUser = async (e) => {
        e.preventDefault();

        const res = await fetch("api/user", {
            method: "DELETE",
        });
        setModalOpen(false);
        if (res.ok) {
            router.push("/?showUserDeleteMessage=true");
        } else {
            setMsg({ message: "Eitthvað fór úrskeiðis, reyndu aftur", isError: true });
        }
    };

    return (
        <div>
            {!user ? (
                "Það þarf að skrá sig inn til þess að sjá prófílinn sinn"
            ) : (
                <div>
                    <div>
                        <Link href="/min-sida">
                            <a>Til baka</a>
                        </Link>
                        <h2>Stillingar</h2>
                    </div>

                    <form onSubmit={handleSubmit} ref={formRef}>
                        {msg.message ? <p style={{ color: msg.isError ? "red" : "#0070f3", textAlign: "center" }}>{msg.message}</p> : null}
                        <div>
                            {/* {!user.avatar ? 
                                <Image
                                    src={defaultAvatar}
                                    alt="Avatar"
                                    width={100}
                                    height={100}
                                /> :
                                <img 
                                    src={user.avatar} 
                                    width="100" 
                                    height="100" 
                                    alt={user.username} 
                                />
                            } */}
                            <label htmlFor="avatar">
                                <input className={styles.customFileInput} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="username">
                                <h5>Nafn/Höfundarnafn</h5>
                                <input className={styles.formInput} required id="username" name="username" type="text" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="email">
                                <h5>Netfang</h5>
                                <input className={styles.formInput} id="email" name="email" type="email" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="bio">
                                <h5>Um mig</h5>
                                <textarea id="bio" name="bio" maxLength="50" />
                            </label>
                        </div>
                        <button disabled={isUpdating} type="submit">
                            Vista breytingar
                        </button>
                    </form>

                    <button 
                        onClick={() => setModalOpen(true)}>Eyða aðgangi</button>
                    <Modal show={isOpen} title="Eyða aðgangi?" onSubmit={handleDeleteUser} onClose={() => setModalOpen(false)} submitText="Já" cancelText="Nei">
                        <p>Allar upplýsingar verða eyddar út af punkti</p>
                    </Modal>
                </div>
            )}
        </div>
    );
}
