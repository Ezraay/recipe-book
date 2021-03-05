import express, { Router } from 'express'
import Session from '../models/Session'

const router = Router()

router.use(express.static('static'))
router.use(express.urlencoded({extended: true}))
router.use(require('cookie-parser')())
router.use(async (req, res: any, next) => {
  res._render = res.render
  res.render = (page: string, locals: any = {}) => {
    locals.page = page
    res._render('layout', locals)
  }

  // Session
  const session = await (async() => {
    const { sessionID } = req.cookies 
    const session = await Session.get(sessionID)
    
    if (session.lastTime + Session.maxAge < Date.now()) {
      session.delete()
      return await Session.get()
    } else {
      session.lastTime = Date.now()
      await session.update()
      return session
    }
  })()

  if (session.user)
    res.locals.user = session.user


  res.locals.session = session
  res.cookie('sessionID', session.sessionID)
  
  next()
})

export default router

export const authenticated = (_: any, res: any, next: () => void) => {
  if (res.locals.user === undefined)
    res.redirect('/login')
  else
    next()
}

export const unauthenticated = (_: any, res: any, next: () => void) => {
  if (res.locals.user !== undefined)
    res.redirect('/')
  else
    next()
}