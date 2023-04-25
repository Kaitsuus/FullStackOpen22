const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} = require('apollo-server');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const handleDatabaseError = (error) => {
  if (error.name === 'ValidationError')
    throw new UserInputError(error.message, {
      invalidArgs: Object.keys(error.errors).map(
        (key) => error.errors[key].path
      )
    });
  else if (error.name === 'MongoServerError' && error.code === 11000)
    throw new UserInputError(error.message, {
      invalidArgs: Object.keys(error.keyPattern)
    });

  throw error;
};

const typeDefs = gql`
  type Author {
    bookCount: Int!
    born: Int
    id: ID!
    name: String!
  }
  type Book {
    author: Author!
    genres: [String!]!
    id: ID!
    published: Int!
    title: String!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
    addBook(
      author: String!
      genres: [String!]!
      published: Int!
      title: String!
    ): Book
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    me: User
  }
`;

const resolvers = {
  Mutation: {
    editAuthor: async (_root, { name, setBornTo }, { authUser }) => {
      if (!authUser) throw new AuthenticationError('unauthenticated');

      return Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true }
      );
    },
    addBook: async (
      _root,
      { author: name, genres, published, title },
      { authUser }
    ) => {
      if (!authUser) throw new AuthenticationError('unauthenticated');

      let author = await Author.findOne({ name });

      if (!author) {
        author = new Author({ name });
        await author.save().catch(handleDatabaseError);
      }

      const book = new Book({ author, genres, published, title });
      await book.save().catch(handleDatabaseError);

      return book;
    },
    createUser: async (_root, { username, favouriteGenre }) => {
      const user = new User({ username, favouriteGenre });
      return user.save().catch(handleDatabaseError);
    },
    login: async (_root, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== 'testuserpassword')
        throw new UserInputError('invalid credentials');

      return { value: jwt.sign({ id: user._id }, process.env.JWT_SECRET) };
    }
  },
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (_root, { author, genre }) => {
      let filter = {};
      if (author) filter.author = await Author.findOne({ name: author });
      if (genre) filter.genres = genre;
      return Book.find(filter);
    },
    me: (_root, _args, { authUser }) => authUser
  },
  Author: {
    bookCount: async (parent) => Book.countDocuments({ author: parent })
  },
  Book: {
    author: async (parent) => {
      await parent.populate('author');
      return parent.author;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req?.headers?.authorization;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const { id } = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
      const authUser = await User.findById(id);
      return { authUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
