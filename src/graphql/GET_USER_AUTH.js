import { gql } from '@apollo/client';

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