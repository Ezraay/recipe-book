import Database from '../src/Database'
import { v4 as getID } from 'uuid'

export interface UserData {
  userID: string
  username: string
  email: string
  logoURL: string
}

export default class User implements UserData {
  static create(username: string, email: string, logoURL: string): User {
    const user = new User()

    user.username = username
    user.email = email
    user.logoURL = logoURL
    user.userID = getID()

    Database.createUser(user)
    
    return user
  }

  static async getUser({ username, email, userID }: { username?: string, email?: string, userID?: string }): Promise<User> {
    const userData = await (async () => {
      if (userID !== undefined) return await Database.getUser(userID)
      else if (username !== undefined) return await Database.getUserByUsername(username)
      else if (email !== undefined) return await Database.getUserByEmail(email)
      else throw 'username, email, and userID were all undefined when fetching user'
    })()
    
    const user = new User(userData)
    return user
  }

  userID: string
  username: string
  email: string
  logoURL: string

  constructor(userData?: UserData) {
    if (userData !== undefined) {
      this.userID = userData.userID
      this.username = userData.username
      this.email = userData.email
      this.logoURL = userData.email
    }
  }
}