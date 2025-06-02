import {Router} from 'express'
import { getUsers } from '../controllers/users.controllers.js'

const router = Router()

router.get('/usuario',getUsers)

export default router