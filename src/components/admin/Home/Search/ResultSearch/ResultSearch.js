import React from 'react';
import ImageNotFound from '../../../../../assets/avatar.png';
import moment from 'moment';
import { Image } from 'semantic-ui-react';

export default function ResultSearch( props ) {
    const { data, setShowModal, setEventSelected, setFrom } = props;
    const handleEventSelect = () => {
        setEventSelected(data.idEvent);
        setFrom('home');
        setShowModal(true);
    }

    return (
        <div className="search-item" onClick={ handleEventSelect }>
            <Image src={ data.avatarUrl || ImageNotFound } circular bordered />
            <div>
                <p>{ data.title }</p>
                <p>{ moment(data.start).format('DD/MM/YYYY') }</p>
            </div>
        </div>
    )
}
