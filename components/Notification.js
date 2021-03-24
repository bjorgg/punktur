import { useEffect, useState, useCallback } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Notification() {
    const router = useRouter();
    const [notificationMessage, setNotificationMessage] = useState(null);

    const showNotificationMessage = useCallback(
        (show, message) => {
            if (show) {
                setNotificationMessage(message);
                setTimeout(() => {
                    router.replace(router.pathname, undefined, { shallow: true });
                }, 3000);
            } else if (notificationMessage) {
                setNotificationMessage(null);
            }
        },
        [notificationMessage, setNotificationMessage]
    );

    useEffect(() => {
        showNotificationMessage(router.query.showUserDeleteMessage, "Notandareikning hefur verið eytt!");
    }, [router.query.showUserDeleteMessage, showNotificationMessage]);

    useEffect(() => {
        showNotificationMessage(router.query.showLogoutMessage, "Útskráning tókst");
    }, [router.query.showLogoutMessage, showNotificationMessage]);

    useEffect(() => {
        showNotificationMessage(router.query.showStoryDeleteMessage, "Sögunni hefur verið eytt");
    }, [router.query.showStoryDeleteMessage, showNotificationMessage]);

    return (
        <div>
            <div className={styles.notification} style={!!notificationMessage ? { opacity: 1, zIndex: 2 } : {}}>
                {notificationMessage}
            </div>
        </div>
    );
}
