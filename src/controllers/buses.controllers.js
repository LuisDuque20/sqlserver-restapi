import { getConnection } from "../database/connection.js"
import sql from 'mssql'

//Funcion para obtener todas las rutas
export const getRutas = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request().query('SELECT * FROM Autobus')
    res.json(result.recordset)
}

//Funcion para obtener UNA sola ruta
export const getOneRuta = async (req, res) => {
    console.log(req.params)
    const pool = await getConnection()
    const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .query(`SELECT * FROM Autobus WHERE id = @id`)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Ruta no encontrada" })
    }

    const ruta = result.recordset[0]
    ruta.mapaUrl = `http://${req.headers.host}/kml/${ruta.Nombre}.kml`
    return res.json(ruta);
}

//Funcion para agregar una ruta
export const postRuta = async (req, res) => {
    console.log(req.body)
    const pool = await getConnection()
    const result = await pool
        .request()
        /*Lo que haces con el input es decirle que busque la propiedad name
        se le especifica el tipo de dato con el que vendra en este caso varchar desde el
        paquete de sql, y la obtendra del 'body' de la peticion.
         Repetiras este proceso para cada campo de la tabla.*/
        .input('name', sql.VarChar, req.body.name)
        /*La arroba indica el valor que sera reemplazado mas tarde por el input*/
        .query('INSERT INTO Autobus (name) VALUES (@name); SELECT SCOPE_IDENTITY() AS id;');
    res.json({
        id: result.recordset[0].id,
        name: req.body.name
    })
}

//Funcion para actualizar ruta
export const putRuta = async (req, res) => {
    const pool = await getConnection()
    const result = await pool
        .request()
        .input('name', sql.VarChar, req.body.name)
        .input('id', sql.Int, req.params.id)
        .query('UPDATE Autobus SET name = @name WHERE id = @id')
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Ruta no encontrada" })
    } else { res.json({ message: `Ruta actualizada correctamente correctamente` }) }
}

//Funcion para borrar ruta
export const deleteRuta = async (req, res) => {
    const pool = await getConnection()
    const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .query('DELETE FROM Autobus WHERE id = @id')
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Ruta no encontrada" })
    } else { res.json({ message: "Ruta eliminada correctamente" }) }
}