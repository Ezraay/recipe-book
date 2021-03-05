import Database from '../src/Database'
import { v4 as getID } from 'uuid'

export interface UserData {
  userID: string
  username: string
  name: string
  email: string
  logoURL: string
  createdTime: number
}

export default class User implements UserData {
  userID: string
  username: string
  name: string
  email: string
  logoURL: string
  createdTime: number

  static async get({ username, email, userID }: { username?: string, email?: string, userID?: string }): Promise<User> {
    const userData = await (async () => {
      if (userID) return await Database.getUser(userID)
      else if (username) return await Database.getUserByUsername(username)
      else if (email) return await Database.getUserByEmail(email)
      else throw 'username, email, and userID were all undefined when fetching user'
    })()
    
    if (!userData) return undefined
    
    const user = new User()

    user.userID = userData.userID
    user.username = userData.username
    user.name = userData.name
    user.email = userData.email
    user.logoURL = userData.logoURL
    user.createdTime = userData.createdTime

    return user
  }

  static async create(username: string, email: string, logoURL: string, name: string) {
    const user = new User()

    user.username = username
    user.email = email
    user.name = name
    user.logoURL = logoURL
    user.userID = getID()
    user.createdTime = Date.now()

    Database.createUser(user)

    return user
  }
}