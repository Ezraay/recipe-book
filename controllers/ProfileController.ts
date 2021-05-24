import { Router } from 'express'
import Recipe from '../models/Recipe'
import User from '../models/User'

const router = Router()

router.get('/:username', async (req, res) => {
  const { username } = req.params

  const profile = await User.get({ username })
  profile.email = undefined

  const recipes = await Recipe.getByUser({ userID: profile.userID })

  res.render('profile', { profile, recipes })
})

router.get('/', async (req, res) => {
  const profile = res.locals.user

  const recipes = await Recipe.getByUser({ userID: profile.userID })

  res.render('profile', { profile, recipes })
})

export default router
