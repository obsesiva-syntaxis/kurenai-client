import { gql } from '@apollo/client';

export const AUTH_USER = gql`
    mutation authUser(  $input:AuthInput  ) {
        authUser( input: $input ) {
            token
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
            id
            email
            name
            type
            avatarUrl
        }
    }
`;

export const UPDATE_AVATAR = gql`
    mutation updateAvatar( $file: Upload ){
        updateAvatar( file: $file ){
            status
            urlAvatar
        }
    }
`;

export const MODIFY_USER = gql`
    mutation modifyUser( $input: UserModifyInput ){
        modifyUser( input: $input )
    }
`;

export const CREATE_USER = gql`
    mutation createUser( $input: UserInput ){
        createUser( input: $input ){
            name
            email
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser( $id: ID! ){
        deleteUser( id: $id )
    }
`;