const { MongoDataSource } = require('apollo-datasource-mongodb');
const { AuthenticationError, ApolloError } = require('apollo-server-core');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

function signToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, function (err, token) {
      if (err) reject(err);
      resolve(token)
    });
  });

}

module.exports = class Users extends MongoDataSource {
  getUser() {
    if (!this.context.user) {
      throw new AuthenticationError('User must be authenticated to access this information')
    }
    return this.model.findById(this.context.user._id)
    // .populate('savedBooks')
  }
  saveBook(book) {
    if (!this.context.user) {
      throw new AuthenticationError('User must be authenticated to access this information')
    }
    return this.model.findOneAndUpdate({ _id: this.context.user._id }, { $push: { savedBooks: book } },
      {
        new:true,
        runValidators:true
      })
  }
  removeBook(bookId) {
    if (!this.context.user) {
      throw new AuthenticationError('User must be authenticated to access this information')
    }
    return this.model.findOneAndUpdate({ _id: this.context.user._id }, { $pull: { savedBooks:{bookId: bookId}}},{
      new:true,
      runValidators:true
    })
  }
  async login(username,password){
    try{
      const user = await this.model.findOne({username})
      if(!user) throw new AuthenticationError('Username or password are incorrect')
      if(await user.comparePassword(password)){
        user.password = undefined
        let payload = {
          _id: user._id,
          username:user.username
        }
        return {
          token:signToken(payload),
          user
        }
      }
      throw new AuthenticationError('Username or password are incorrect')
    }
    catch(error){
      throw new AuthenticationError(error)
    }
  }
  async createUser(username, email, password) {
    try {
      const user = await this.model.create({
        username,
        email,
        password
      });
      user.password = undefined
      var payload = {
        _id: user._id,
        username: user.username
      }
      return {
        token: await signToken(payload),
        user
      }
    }
    catch (err) {
      console.error(err)
      throw new ApolloError(err.message)
    }
  }
}