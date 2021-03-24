import { useEffect, useState, useCallback } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Notification() {
    const router = useRouter();
    const [notificationMessage, setNotificationMessage] = useState(null);

    const handleNotification = useCallback(
        (show, message) => {
            const messageAlreadyShown = notificationMessage === message;
            if (show) {
                // Dont want to trigger the timout multiple times if message has already been shown
                if (!messageAlreadyShown) {
                    setNotificationMessage(message);
                    setTimeout(() => {
                        router.replace(router.asPath.split('?')[0], undefined, { shallow: true });
                    }, 3000);
                }
            } else if (messageAlreadyShown) {
                setNotificationMessage(null);
            }
        },
        [router, notificationMessage, setNotificationMessage]
    );

    useEffect(() => {
        handleNotification(router.query.showUserDeleteMessage, "Notandareikning hefur verið eytt!");
        handleNotification(router.query.showLogOutMessage, "Útskráning tókst");
        handleNotification(router.query.showStoryCreatedMessage, "Saga þín er birt!");
        handleNotification(router.query.showStoryDeleteMessage, "Sögunni hefur verið eytt");
    }, [router.query, handleNotification]);

    return (
        <div>
            <div className={styles.notification} style={!!notificationMessage ? { opacity: 1, zIndex: 2 } : {}}>
                {notificationMessage}
            </div>
        </div>
    );
}
