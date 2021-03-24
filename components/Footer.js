import React, { useState, useEffect } from "react";
import styles from "../styles/Footer.module.css";
import Modal from "../components/modal";

export default function Footer() {
    const [isOpen, setModalOpen] = useState(false);

    return (
        <footer className={styles.footer}>
            <h5>&#169; 2021 Punktur ehf.</h5>
            <div>
                <div className={styles.text}>
                            
                    <a onClick={() => setModalOpen(true)}>
                        <h5>notendaskilmálar</h5>
                    </a>
                </div>
                <Modal 
                    show={isOpen} 
                    title="Notendaskilmálar" 
                    onSubmit={() => setModalOpen(false)}
                    onClose={() => setModalOpen(false)} 
                    submitText="frábært"
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
            <h5>punktur@punktur.is</h5>
        </footer>
    );
}

