import { gql } from '@apollo/client';

export const CREATE_POST = gql`
    # Write your query or mutation here
    mutation createPost( $input: PostInput ){
        createPost( input: $input ){
            id
            name
            message
            postDate
      }
    }
`;