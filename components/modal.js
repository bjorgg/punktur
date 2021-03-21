import styles from "../styles/Home.module.css";

const Modal = ({ show, onClose, onSubmit, title, submitText = "Já", cancelText = "Nei", children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <h3>{title}</h3>
                <div>{children}</div>
                <div>
                    <button onClick={onSubmit}>{submitText}</button>
                    <button onClick={onClose}>{cancelText}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
