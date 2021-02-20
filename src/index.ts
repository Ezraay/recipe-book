import express from 'express'
import { port } from './Constants'

import Middleware from '../controllers/HomeController'
import HomeController from '../controllers/HomeController'
import LoginController from '../controllers/LoginController'
import ProfileController from '../controllers/ProfileController'
import RecipeController from '../controllers/RecipeController'

const app = express()

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(Middleware)
app.use('/profile', ProfileController)
app.use('/recipe', RecipeController)
app.use(LoginController)
app.use(HomeController)

app.listen(port, () => console.log(`Server listening on port ${port}`))
