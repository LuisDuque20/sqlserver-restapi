import express from 'express' 
import busesRoutes from './routes/buses.routes.js'
import usuarioRoutes from './routes/usuario.routes.js'

const app = express()

app.use(express.json())
app.use(busesRoutes)
app.use(usuarioRoutes)

export default app