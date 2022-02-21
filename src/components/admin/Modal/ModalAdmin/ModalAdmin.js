import React from 'react';
import Modal from 'react-modal';

import './ModalAdmin.scss';

export default function ModalAdmin( props ) {
    const { showModal, setShowModal, titleModal, childrenModal } = props;
    return (
        <Modal className="modal-admin" overlayClassName="modal-fondo" isOpen={ showModal } onRequestClose={ () => setShowModal(false) }>
            <h1 className="modal-admin__title">
                { titleModal }
            </h1>
            <div className="modal-admin__body">
                { childrenModal }
            </div>
        </Modal>
    )
}
