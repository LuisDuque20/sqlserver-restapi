import { getConnection } from "../database/connection.js"

export const getUsers = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query('SELECT * FROM dbo.Usuario')
        res.json(result.recordset)
    } catch (error) {
        console.error("Error en getUsers:", error)
        res.status(500).json({ message: "Error al obtener los usuarios", error: error.message })
    }
}
