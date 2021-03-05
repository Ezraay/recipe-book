import User from './User'

import { v4 as getID } from 'uuid'
import Database from '../src/Database'

export interface SessionData {
  sessionID: string
  lastTime: number

  userID?: string
  signingUp?: { [index: string]: any }
}

export default class Session {
  static maxAge = 604800000
  sessionID: string
  lastTime: number

  user?: User
  signingUp?: { [index: string]: any }

  static async get (sessionID: string = null) {
    const session = new Session()

    if (sessionID !== undefined) {
      const sessionData = await Database.getSession(sessionID)
      if (sessionData === null) {
        await session.create()
      } else {
        session.sessionID = sessionData.sessionID
        session.lastTime = sessionData.lastTime

        if (sessionData.userID != undefined)
          session.user = await User.get({ userID: sessionData.userID })
        session.signingUp = sessionData.signingUp
      }
    } else {
      await session.create()
    }

    return session
  }

  private async create () {
    this.sessionID = getID()
    this.lastTime = Date.now()

    await Database.createSession(this)
  }

  async delete () {
    await Database.deleteSession(this)
  }

  async update () {
    await Database.updateSession(this)
  }
}
