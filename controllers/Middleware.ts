import express, { Router } from 'express'

const router = Router()

router.use(express.static('static'))
router.use((_, res: any, next) => {
  res._render = res.render
  res.render = (page: string, locals: any = {}) => {
    locals.page = page
    res._render('layout', locals)
  }

  next()
})

export default router