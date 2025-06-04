import {Router} from 'express'
import { getUsers } from '../controllers/users.controllers.js'
import { getFavoritas } from '../controllers/users.controllers.js'

const router = Router()

// Obtenes todos los usuarios
router.get('/usuario',getUsers)

// Mostrar rutas favoritas por usuario
router.get('/usuario/:id/favorita', getFavoritas)

export default router