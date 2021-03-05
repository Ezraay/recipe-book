import { Router } from 'express'
import User from '../models/User';
import Session from '../models/Session'
import { googleClientID } from '../src/Constants'
import { authenticated, unauthenticated } from './Middleware'

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(googleClientID);

async function verify(token: string) {
  try {

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleClientID
    })
    
    const payload = ticket.getPayload()
    return payload
  } catch {
    return null
  }
}

const router = Router()

router.get('/login', unauthenticated, (req, res) => {
  res.render('login', { googleClientID, signingUp: res.locals.session.signingUp })
})

router.post('/logout', authenticated, async (req, res) => {
  const session: Session = res.locals.session
  session.user = undefined
  await session.update()

  res.json({ status: 200 })
})

router.post('/login', unauthenticated, async (req, res) => {
  const { token } = req.body
  const userData = await verify(token)
  if (!userData ?? !userData.email_verified) 
    return 
  
  const { picture, email, name } = userData
  const existingUser = await User.get({ email })
  const session: Session = res.locals.session

  if (existingUser) {
    session.user = existingUser
    await session.update()

    res.json({ status: 200 })
    return 
  }

  session.signingUp = {
    picture, email, name
  }
  await session.update()

  res.json({ status: 201 })
})

router.post('/choose-username', unauthenticated, async (req, res) => {
  const session: Session = res.locals.session
  if (!session.signingUp)
    return
  
  const { username } = req.body
  if (await User.get({ username })) {
    res.json({ status: 400 })
    return
  }

  const { email, picture, name } = session.signingUp
  const user = await User.create(username, email, picture, name)
  session.user = user
  session.signingUp = undefined
  await session.update()

  res.json({status: 200})
})

export default router
