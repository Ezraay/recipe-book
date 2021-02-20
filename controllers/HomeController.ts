import express, { Router } from 'express'

const router = Router()

router.get('/', (_, res) => {
  res.render('index')
})

router.get('/*', (_, res) => {
  res.redirect('/')
})

export default router