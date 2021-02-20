import User from './User'

import { v4 as getID } from 'uuid'

export default class Recipe {
  static create (
    author: User,
    title: string,
    ingredients: string[],
    steps: string[],
    picture: string,
    visible: boolean
  ): Recipe {
    const recipe = new Recipe()

    recipe.author = author
    recipe.title = title
    recipe.ingredients = ingredients
    recipe.steps = steps
    recipe.picture = picture
    recipe.visible = visible
    
    // TODO Save recipe to database

    return recipe
  }

  recipeID: string
  timeCreated: number

  title: string
  ingredients: string[]
  steps: string[]
  picture: string

  author: User
  visible: boolean
}
