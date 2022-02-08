import React, { useState } from 'react';
import Modal from 'react-modal';

import './ModalUser.scss';

export default function ModalUser( props ) {

    const { showModal, setShowModal, titleModal, childrenModal } = props;

    return (
        <Modal className="modal-user" overlayClassName="modal-fondo"  isOpen={ showModal } onRequestClose={ () => setShowModal(false) }>
            <h1 className="modal-user__title">
                { titleModal }
            </h1>
            <div className="modal-user__body">
                { childrenModal }
            </div>
        </Modal>
    )
}
