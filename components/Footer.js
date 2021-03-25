import React, { useState, useEffect } from "react";
import styles from "../styles/Footer.module.css";
import Modal from "../components/modal";

export default function Footer() {
    const [isOpen, setModalOpen] = useState(false);
    const [isAboutPunktOpen, setAboutPunktModalOpen] = useState(false);

    return (
        <footer className={styles.footer}>
            <div>
                <a onClick={() => setAboutPunktModalOpen(true)}>
                    <h5>&#169; 2021 Punktur ehf.</h5>
                </a>
                <Modal show={isAboutPunktOpen} title="Um Punkt" onClose={() => setAboutPunktModalOpen(false)} cancelText="Loka" clickOutside={() => setModalOpen(false)}>
                    <div>
                        <p>Punktur er nýr miðill fyrir lesþyrsta og orðglaða penna Íslands.</p>
                        <p>Í vefappinu okkar geta allir komið og lesið smásögur og ljóð á íslensku. Hægt er að flokka sögur eftir sínu áhugasviði og einnig hlusta á þær með talgervlinum Dóru. </p>
                        <p>
                            Notendur get skráð sig og búið til notendareikning. Sem notandi getur þú sent inn þín eigin skrif á vefinn og einnig gefið sögum stjörnur ef þér líkar þær. Þetta er fyrsta útgáfa vefsins Punktur og vonandi munu
                            koma fleiri eiginleikar í framtíðinni!
                        </p>
                        <p>Eitt af markmiðum vefsins er að viðhalda íslenskri tungu og að hjálpa fólki að koma sínum skrifum á framfæri.</p>
                        <p>Við hjá Punkti vonum að ykkur líki vel og þiggjum allar ábendingar með þökkum.</p>
                        <p>Með kærri kveðju,</p>
                        <p>Björg, Hulda, Íris og Kolbrún</p>
                        <p>Stofnendur Punkts</p>
                    </div>
                </Modal>
            </div>

            <div className={styles.notandi}>
                <div className={styles.text}>
                    <a onClick={() => setModalOpen(true)}>
                        <h5>Notendaskilmálar</h5>
                    </a>
                </div>
                <Modal show={isOpen} title="Notendaskilmálar" onClose={() => setModalOpen(false)} cancelText="Loka" clickOutside={() => setModalOpen(false)}>
                    <div>
                        <p>Punktur (hér eftir „Punktur“, „við“ eða „okkar“) býður upp á forrit sem gerir þér (hér eftir nefnt „þú“ eða „notandi“) kleift að fá aðgang að sögum eftir aðra notendur í gegnum vafra.</p>
                        <p>Með því að stofna reikning hjá Punkt ert þú að gera bindandi samning við Punkt og samþykkir að fara eftir þessum notendaskilmálum.</p>
                        <p>
                            1. Allar sögur sem eru birtar falla undir höfundarrétt notenda. Ekki er leyfilegt að stela, afrita og birta sögur frá öðrum notendum undir sínu nafni. Punktur hefur rétt á að eyða þeim sögum sem ekki fylgja
                            þessari reglu.
                        </p>
                        <p>2. Sögur sem innihalda ítarlegar lýsingar af óviðeigandi umræðuefnum eru ekki leyfðar. Punktur hefur rétt á að eyða þeim sögum sem ekki fylgja þessari reglu.</p>
                        <p>3. Notendur hafa ekki leyfi fyrir því að hlaða inn nektarmyndum eða annarskonar óviðeigandi myndum sem prófílmynd. Punktur hefur rétt á að eyða aðgöngum sem ekki fylgja þessari reglu.</p>
                        <p>4. Þessir notendaskilmálar hafa þá undantekningu að geta breyst með tímanum.</p>
                        <p>Síðast yfirfarið 24. mars 2021</p>
                        <p>Punktur ehf.</p>
                    </div>
                </Modal>
            </div>
            <a href="mailto: punkturapp@gmail.com">
                <h5>punkturapp@gmail.com</h5>
            </a>
        </footer>
    );
}
