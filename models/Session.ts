import User from "./User";

import { v4 as getID } from 'uuid'

export default class Session {
  static create(user: User): Session {
    const session = new Session()

    session.user = user
    session.lastTime = Date.now()
    session.sessionID = getID()

    // TODO Save the session to database

    return session
  }

  sessionID: string
  user: User
  lastTime: number
}