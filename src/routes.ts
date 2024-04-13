import { Router, request, response, Request, Response } from 'express'
import { createUsers, getUsers } from './controller/UserController'
const routes = Router()

routes.get('/users', getUsers)

routes.post('/users', createUsers)

export default routes