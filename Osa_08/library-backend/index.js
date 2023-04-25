const { ApolloServer, gql, UserInputError } = require('apollo-server');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const handleDatabaseError = (error) => {
  if (error.name === 'ValidatioError')
    throw new UserInputError(error.message, {
      invalidArgs: Object.keys(error.errors).map((key) => error.errors[key].path),
    });
  else if (
    error.name === 'MongoServerError' &&
    error.code === 11000
  )
    throw new UserInputError(error.message, {
      invalidArgs: Object.keys(error.keyValue),
    });
    throw error;
};

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
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    me: User
  }
  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
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
        await author.save().catch(handleDatabaseError);;
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
    },
    editAuthor: (_root, { name, setBornTo }) => {
      Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true })
    },
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
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
