
import 'reflect-metadata'
import {Action,createKoaServer, BadRequestError} from "routing-controllers"
import setupDb from './db'
import User from './users/entity'
import {verify} from './jwt'

import UserController from "./users/controller"
import LoginController from "./logins/controller"
import EventController from "./events/controller"
import TicketController from './tickets/controller'
import CommentController from './comments/controller'

const port = process.env.PORT || 4000

const app = createKoaServer({
  cors: true,
  controllers: [
     UserController,
     LoginController,
     EventController,
     TicketController,
     CommentController
  ],

  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }
    return false
  },

  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      
      if (token) {
        const {id} = verify(token)
        return User.findOne(id)
      }
    }
    return undefined
  }


})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port'${port}`))
  )
  .catch(err => console.error(err))