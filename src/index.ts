import express from 'express'
import { port } from './Constants'
import Database from './Database'

import Middleware from '../controllers/Middleware'
import HomeController from '../controllers/HomeController'
import LoginController from '../controllers/LoginController'
import ProfileController from '../controllers/ProfileController'
import RecipeController from '../controllers/RecipeController'

const app = express()

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(Middleware)
app.use('/profile', ProfileController)
app.use('/recipes', RecipeController)
app.use(LoginController)
app.use(HomeController)

Database.start(() => {
  app.listen(port, () => console.log(`Server listening on port ${port}`))
})
