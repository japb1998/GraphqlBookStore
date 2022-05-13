import { MongoDataSource } from 'apollo-datasource-mongodb'

export default class Users extends MongoDataSource {
  getUser(userId) {
    return this.findById(userId)
  }
}