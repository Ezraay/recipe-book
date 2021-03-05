import { mongoConnectionString, mongoDatabaseName } from './Constants'
import User, { UserData } from '../models/User'
import Session, { SessionData } from '../models/Session'
import Recipe, { RecipeData } from '../models/Recipe'
import { Db, MongoClient } from 'mongodb'

export default class Database {
  static client: MongoClient
  static db: Db

  static start (callback: () => void) {
    MongoClient.connect(
      mongoConnectionString,
      { useUnifiedTopology: true },
      (error, client) => {
        if (error) throw error

        Database.client = client
        Database.db = client.db(mongoDatabaseName)

        callback()
      }
    )
  }

  static close () {
    Database.client.close()
  }

  static async createUser (user: User) {
    const collection = Database.db.collection('users')
    const { userID, username, email, logoURL, createdTime, name } = user
    await collection.insertOne({
      userID,
      username,
      email,
      logoURL,
      createdTime,
      name
    })
  }

  static async createSession (session: Session) {
    const collection = Database.db.collection('sessions')
    const { sessionID, lastTime } = session
    await collection.insertOne({
      userID: session.user?.userID,
      sessionID,
      lastTime
    })
  }

  static createRecipe (recipe: Recipe) {}

  static async getUserByEmail (email: string): Promise<UserData> {
    const collection = Database.db.collection('users')
    const result = await collection.findOne({ email })
    return <UserData>result
  }

  static async getUserByUsername (username: string): Promise<UserData> {
    const collection = Database.db.collection('users')
    const result = await collection.findOne({ username })
    return <UserData>result
  }

  static async getUser (userID: string): Promise<UserData> {
    const collection = Database.db.collection('users')
    const result = await collection.findOne({ userID })
    return <UserData>result
  }

  static async getSession (sessionID: string): Promise<SessionData> {
    const collection = Database.db.collection('sessions')
    const result = await collection.findOne({ sessionID })
    return <SessionData>result
  }

  static async getRecipes (searchTerm: string): Promise<RecipeData[]> {
    const collection = Database.db.collection('recipes')
    const result = await collection.find({ title: searchTerm }).toArray()
    return <Array<RecipeData>>result
  }

  static async getRecipe (recipeID: string): Promise<RecipeData> {
    const collection = Database.db.collection('recipes')
    const result = await collection.findOne({ recipeID })
    return <RecipeData>result
  }

  static async updateSession (session: Session) {
    const collection = Database.db.collection('sessions')
    const { sessionID, signingUp } = session
    await collection.updateOne(
      { sessionID: session.sessionID },
      {
        $set: {
          lastTime: Date.now(),
          userID: session.user?.userID,
          sessionID,
          signingUp
        }
      }
    )
  }

  static async updateUser (user: User) {
    const collection = Database.db.collection('users')
    const { userID, username, name, email, logoURL, createdTime } = user
    await collection.updateOne(
      { userID },
      {
        $set: {
          userID,
          username,
          name,
          email,
          logoURL,
          createdTime
        }
      }
    )
  }

  static async deleteSession (session: Session) {
    const collection = Database.db.collection('sessions')
    await collection.deleteOne({ sessionID: session.sessionID })
  }

  static async deleteRecipe (recipe: Recipe) {
    const collection = Database.db.collection('sessions')
    await collection.deleteOne({ sessionID: recipe.recipeID })
  }
}
