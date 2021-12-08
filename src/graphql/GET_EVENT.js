import { gql } from '@apollo/client';


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
            initPayment
            totalPayment
            desc
            user
            userName
            hours
        }
    }
`;