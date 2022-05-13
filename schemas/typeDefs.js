const { gql } = require('apollo-server-express');


const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }
  type User{
    _id:ID!
    username:String!
    email:String!
    bookCount:Int
    savedBooks:[Book]!
  }
  type Auth {
token:String!
user:User!
  }
  type Query {
    books: [Book]
    getMe:User
    getApiKey:String!
  }

  type Mutation {
    login(username:String,password:String!):Auth
    signUp(input:signUpInput!):Auth
    saveBook(input:bookInput!):User
    removeBook(bookId:ID!):User
  }


  # input type if you know you could use this same input in more than one mutation
  # if you will have types inside of an input they need to be inputs as well
  input signUpInput {
      username:String!
      email:String!
      password:String!
  }
  input bookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
`;

module.exports = typeDefs