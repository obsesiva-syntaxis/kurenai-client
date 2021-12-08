import { gql } from '@apollo/client';

export const UPDATE_EVENT = gql`
    mutation updateEvent($id: ID!, $input: EventInput){
        updateEvent( id: $id, input: $input ){
            id
            insta
            title
        }
    }
`;