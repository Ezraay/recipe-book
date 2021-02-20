import { v4 as getID } from 'uuid'

export default class User {
  static create(username: string, email: string, logoURL: string): User {
    const user = new User()

    user.username = username
    user.email = email
    user.logoURL = logoURL
    user.userID = getID()

    // TODO Save user data to database
    
    return user
  }

  userID: string
  username: string
  email: string
  logoURL: string
}