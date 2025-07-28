import 'dotenv/config'
import app from "./app.js"
import {getConnection} from "./database/connection.js"

getConnection()
console.log("servidor iniciado...")

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log("Servidor iniciado en el puerto 1000...")
})
