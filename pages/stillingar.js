import styles from "../styles/Form.module.css";
import { useCurrentUser } from "../hooks/user";
import React, { useState, useEffect, useRef } from "react";
import Modal from "../components/modal";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Settings() {
    const router = useRouter();
    const [user] = useCurrentUser();
    const [isOpen, setModalOpen] = useState(false);
    const [selectedImg, setImg] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const formRef = useRef();
    const [msg, setMsg] = useState({ message: "", isError: false });

    useEffect(() => {
        // initializing user data in form input
        if (formRef.current) {
            const form = formRef.current;
            form.email.value = user.email;
            form.username.value = user.username;
            form.bio.value = user.bio ?? "";
        }
    }, [user]);
    // read data from form to be saved
    const getFormData = () => {
        const form = formRef.current;
        let avatar = null;
        if (form.avatar.files[0]) {
            avatar = form.avatar.files[0];
        }
        const formData = new FormData();
        formData.append("email", form.email.value);
        formData.append("username", form.username.value);
        formData.append("bio", form.bio.value);
        formData.append("avatar", avatar);
        return formData;
    };

    const handleImgChange = (e) => {
        const img = e.target.files?.[0];
        if (img) {
            const fileReader = new FileReader();
            fileReader.onload = function (e) {
                setImg(e.target.result);
            };
            fileReader.readAsDataURL(img);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // disable submitting while updating is in progress

        if (isUpdating) return;
        setIsUpdating(true);

        const res = await fetch("api/user", {
            method: "PATCH",
            body: getFormData(),
        });
        if (res.status === 200) {
            router.push("/min-sida/?showUserUpdatedMessage=true");
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
                ""
            ) : (
                <div>
                    <div>
                        <Link href="/min-sida">
                            {/* <a>Til baka</a> */}
                            <a>
                                <Image src="/Icons/ArrowLeft.svg" alt="til baka" width={24} height={24} />
                            </a>
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} ref={formRef}>
                        {msg.message ? <h5 style={{ color: msg.isError ? "#D94D11" : "#73B07D", textAlign: "center" }}>{msg.message}</h5> : null}
                        <h3>Stillingar</h3>
                        <div>
                            <div className={styles.avatarDiv}>
                              <img className={styles.avatarImg} src={selectedImg || user.avatar} />  
                            </div>
                            
                            <label htmlFor="avatar">
                                <input className={styles.customFileInput} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={handleImgChange} />
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
                                <textarea id="bio" name="bio" maxLength="200" />
                            </label>
                        </div>
                        <button disabled={isUpdating} type="submit">
                            <Image src="/Icons/save.svg" alt="Ný saga" width={24} height={24} />
                            Uppfæra
                        </button>
                    </form>
                    <div className={styles.deleteDiv}>
                        <button className={styles.deleteButton} onClick={() => setModalOpen(true)}>
                            <Image src="/Icons/Trash.svg" alt="Ný saga" width={24} height={24} />
                            Eyða aðgangi
                        </button>
                    </div>

                    <Modal show={isOpen} title="Ertu viss um að þú viljir eyða aðgangi þínum?" onSubmit={handleDeleteUser} onClose={() => setModalOpen(false)} submitText="Já" cancelText="Nei">
                        <p>Allar upplýsingar verða eyddar út af punkti</p>
                    </Modal>
                </div>
            )}
        </div>
    );
}
