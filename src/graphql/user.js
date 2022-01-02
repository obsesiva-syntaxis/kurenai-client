import { gql } from '@apollo/client';

export const AUTH_USER = gql`
    mutation authUser(  $input:AuthInput  ) {
        authUser( input: $input ) {
            token
        }
    }
`;

export const GET_USER_AUTH = gql`
    query getUserAuth{
        getUserAuth{
            id
            name
            email
            avatarUrl
        }
    }
`;

export const GET_USER = gql`
    query getUser( $id: ID! ){
        getUser(id: $id){
            name
            email
            avatarUrl
        }
    }
`;

export const GET_USERS = gql`
    query getUsers {
        getUsers {
            email
            id
        }
    }
`;