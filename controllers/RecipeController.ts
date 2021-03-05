import { Router } from 'express'

const router = Router()

router.get('/:author/:recipe', (req, res) => {
  res.render('recipes/recipe')
})

router.get('/search/:recipe', (req, res) => {
  res.render('recipes/search')
})

router.get('/create', (req, res) => {
  res.render('recipes/create')
})

router.get('/', (req, res) => {
  res.render('recipes/all')
})

export default router
