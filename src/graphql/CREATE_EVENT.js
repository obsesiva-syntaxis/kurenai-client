import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
    mutation createEvent( $input: EventInput ){
        createEvent( input: $input ){
            id
        }
    }
`;