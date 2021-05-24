import User from './User'

import { v4 as getID } from 'uuid'
import Database from '../src/Database'

export interface RecipeData {
  recipeID: number
  authorID: number

  title: string
  url: string
  ingredients: string[]

  timeTaken: number
  datePosted: number
  visible: boolean
  pictureURL: string
  steps: string[]
}

export default class Recipe {
  recipeID: number
  author?: User

  title: string
  url: string
  ingredients: string[]

  timeTaken: number
  datePosted: number
  visible: boolean
  pictureURL: string
  steps: string[]

  static async getByUser({ userID }: { userID: string }): Promise<Recipe[]> {
    return []
  }

}
