import sql from 'mssql'
import { getConnection } from "../database/connection.js"

export const getUsers = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query('SELECT * FROM dbo.Usuario')
        res.json(result.recordset)
    } catch (error) {
        console.error("Error en getUsers:", error)
        res.status(500).json({ message: "Error al obtener los rutasusuarios", error: error.message })
    }
}

export const getFavoritas = async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "ID de usuario inválido" });

        const pool = await getConnection()
        const ps = new sql.PreparedStatement(pool);
        ps.input('usuarioId', sql.Int);

        await ps.prepare(`
        SELECT A.*
        FROM Usuario_AutobusFavorito UAF
        JOIN Autobus A ON A.Id = UAF.AutobusId
        WHERE UAF.UsuarioId = @usuarioId
        `);
        const result = await ps.execute({ usuarioId });

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Este usuario no tiene rutas favoritas." });
        } else { res.json({ message: `Ruta actualizada correctamente correctamente` }) }
    } catch (err) {
        console.error("Error al mostrar las rutas favoritas del usuario:", err);
        res.status(500).json({ message: "Error del servidor" });
    } finally {
        if (ps) await ps.unprepare();
    }
}