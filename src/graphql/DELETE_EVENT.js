import { gql } from '@apollo/client';

export const DELETE_EVENT = gql`
    mutation deleteEvent( $id: ID!){
        deleteEvent( id: $id){
            name
            id
        }
    }
`;