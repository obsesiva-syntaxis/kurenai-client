import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
    query getEvents{
        getEvents{
            id
            title
            start
            end
            bgColor
            # insta
            # imgUrl
            # initPayment
            # totalPayment
            # name
            # bgColor
            # rut
            # email
            # address
            # birdDate
            # phoneNumber
        }
    }
`;