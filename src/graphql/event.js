import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
    mutation createEvent( $input: EventInput ){
        createEvent( input: $input ){
            id
        }
    }
`;

export const DELETE_EVENT = gql`
    mutation deleteEvent( $id: ID! ){
        deleteEvent( id: $id )
    }
`;

export const GET_EVENT = gql`
    query getEventById( $id: ID! ){
        getEventById( id: $id ){
            id
            rut
            name
            address
            phoneNumber
            birdDate
            email
            start
            end
            title
            insta
            reservePayment
            hourPayment
            totalPayment
            desc
            bgColor
            user {
                id
                name
                avatarUrl
            }
            hours
        }
    }
`;

export const GET_EVENTS = gql`
    query getEvents{
        getEvents{
            id
            title
            start
            end
            bgColor
        }
    }
`;

export const UPDATE_EVENT = gql`
    mutation updateEvent($id: ID!, $input: EventInput){
        updateEvent( id: $id, input: $input ){
            id
            insta
            title
        }
    }
`;

export const LAST_EVENTS_ADDED = gql`
    query lastEventsAdded {
        lastEventsAdded {
            id
            title
            bgColor
            insta
            user {
                name
                avatarUrl
            }
        }
    }
`;

export const SEARCH = gql`
    query search( $search: String ){
        search( search: $search ){
            id
            title
            insta
            user {
                name
                email
                avatarUrl
            }
            start
        }
    }
`;

export const TODAY = gql`
    query todayEvent {
        todayEvent{
            id
            title
            insta
            hours
            desc
            bgColor
            phoneNumber
            user {
                name
                avatarUrl
            }
        }
    }
`;

export const TOMORROW = gql`
    query tomorrowEvent {
        tomorrowEvent{
            id
            title
            insta
            hours
            bgColor
            desc
            phoneNumber
            user {
                name
                avatarUrl
            }
        }
    }
`;