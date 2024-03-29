import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query GetAllAuthors {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`;

export const ALL_BOOKS = gql`
  query GetAllBooks($genre: String) {
    allBooks(genre: $genre) {
      author {
        name
      }
      genres
      id
      published
      title
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      favouriteGenre
    }
  }
`;