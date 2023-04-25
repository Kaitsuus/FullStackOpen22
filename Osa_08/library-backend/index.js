const { ApolloServer, gql } = require('apollo-server');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (_root, { author, genre }) => {
      let filter = {};
      if (author) filter.author = await Author.findOne({ name: author });
      if (genre) filter.genres = genre;
      return Book.find(filter);
    },
  },
  Author: {
    bookCount: async (parent) => Book.countDocuments({ author: parent }),
  },
  Book: {
    author: async (parent) => {
      await parent.populate('author');
      return parent.author;
    },
  },
  Mutation: {
    addBook: async (_root, { author: name, genres, published, title }) => {
      let author = await Author.findOne({ name });

      if (!author) {
        author = new Author({ name });
        await author.save();
      }

      const book = new Book({ author, genres, published, title });
      await book.save();

      return book;
    },
    editAuthor: (_root, { name, setBornTo }) => {
      Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true })
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
