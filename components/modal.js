import styles from "../styles/Modal.module.css";

const Modal = ({ show, onClose, onSubmit, title, submitText = "Já", cancelText = "Nei", children, clickOutside }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalContainer} onClick={clickOutside}>
            <div className={styles.modal}>
                <h4>{title}</h4>
                <div>{children}</div>
                <div className={styles.modalButtons}>
                    {onSubmit && <button className={styles.modalButton} onClick={onSubmit}>{submitText}</button>}
                    <button className={styles.modalButton} onClick={onClose}>{cancelText}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
