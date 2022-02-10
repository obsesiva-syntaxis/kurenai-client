import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchSU, Image } from 'semantic-ui-react';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { SEARCH } from '../../../../graphql/event';
import ImageNotFound from '../../../../assets/avatar.png';
import ResultSearch from './ResultSearch';
import ModalEvent from '../../Modal/ModalEvent';
import moment from 'moment';

import 'semantic-ui-css/semantic.min.css';
import 'moment/locale/es-mx';
import './Search.scss';

export default function Search() {
    const [search, setSearch] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [handleSetupEvent, setHandleSetupEvent] = useState('edit');
    const [eventSelected, setEventSelected] = useState('');
    const [results, setResults] = useState([]);
    const [from, setFrom] = useState('');
    const { data, loading, refetch } = useQuery(SEARCH, {
        variables: { search }
    });

    useEffect(() => {
        if( size(data?.search) > 0 ){
            const events = [];
            data.search.forEach( (event, index) => {
                events.push({
                    key: index,
                    idEvent: event.id,
                    title: event.title,
                    insta: event.insta,
                    avatarUrl: event.user.avatarUrl,
                    start: event.start,
                });
            });
            setResults(events);
        } else {
            setResults([]);
        }
    }, [data]);

    const onChange = (e) => {
        if (e.target.value){ 
            setSearch(e.target.value);
        } else { 
            setSearch(null);
        }
    }

    const handleResultSelect = () => {
        setSearch(null);
        setResults([]);
    }

    return (
        <div className="search">
            <SearchSU 
            className="search__events"
            placeholder="Buscar Eventos"
            fluid
            input={{ icon: 'search', iconPosition: 'left' }}
            loading={ loading }
            value={ search || '' }
            onSearchChange={ onChange }
            onResultSelect={ handleResultSelect }
            results={ results }
            resultRenderer={(e) => <ResultSearch data={e} setShowModal={ setShowModal } setEventSelected={ setEventSelected } handleSetupEvent={ handleSetupEvent } setFrom={ setFrom }/>}
            />

            <ModalEvent showModal={ showModal } eventSelected={ eventSelected } setShowModal={ setShowModal } refetch={ refetch } from={ from }/>
        </div>
    )
}