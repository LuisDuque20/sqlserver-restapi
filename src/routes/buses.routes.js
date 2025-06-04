import {Router} from 'express'
import { getRutas } from '../controllers/buses.controllers.js'
import { getOneRuta } from '../controllers/buses.controllers.js'
import { postRuta } from '../controllers/buses.controllers.js'
import { putRuta } from '../controllers/buses.controllers.js'
import {deleteRuta} from '../controllers/buses.controllers.js'
import { getParadasOfRuta } from '../controllers/buses.controllers.js'

const router = Router()
//Ruta para obtener la informacion de multiples buses
router.get('/rutas', getRutas)

//Ruta para obtener solamente la info de un bus
router.get('/rutas/:id', getOneRuta)

//Ruta para crear buses
router.post('/rutas', postRuta)

//Ruta para actualizar la info de un bus
router.patch('/rutas/:id', putRuta)

//Ruta para eliminar un bus
router.delete('/rutas/:id', deleteRuta)

router.get('rutas/:id/paradas', getParadasOfRuta)

export default router