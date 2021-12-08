import { gql } from '@apollo/client';

export const GET_USER = gql`
    query getUser( $id: ID! ){
        getUser(id: $id){
            name
            email
            avatarUrl
        }
    }
`;