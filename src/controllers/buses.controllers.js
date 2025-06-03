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
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });
        const pool = await getConnection();
        const ps = new sql.PreparedStatement(pool);
        ps.input('id', sql.Int);
        await ps.prepare('SELECT * FROM Autobus WHERE id = @id');
        const result = await ps.execute({ id });

        await ps.unprepare();
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Ruta no encontrada" });
        }

        const ruta = result.recordset[0];
        ruta.mapaUrl = `http://${req.headers.host}/kml/${ruta.Nombre}.kml`;

        return res.json(ruta);

    } catch (err) {
        console.error("Error al obtener la ruta:", err);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

//Funcion para agregar una ruta
export const postRuta = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || name.trim() === "") return res.status(400).json({ message: "El nombre de la ruta es obligatorio." });

        const pool = await getConnection();

        const ps = new sql.PreparedStatement(pool)
        ps.input('name', sql.VarChar)
        await ps.prepare('INSERT INTO Autobus (name) VALUES (@name); SELECT SCOPE_IDENTITY() AS id;')
        const result = await ps.execute({ name });

        res.status(201).json({
            id: result.recordset[0].id,
            name: name
        });

    } catch (err) {
        console.error("Error al crear la ruta:", err);
        res.status(500).json({ message: "Error del servidor" });
    } finally {
        if (ps) await ps.unprepare();
    }
};

//Funcion para actualizar ruta
export const putRuta = async (req, res) => {
    try {
        const name = req.body.name;
        const id = parseInt(req.params.id);

        if (!name || name.trim() === "") return res.status(400).json({ message: "El nombre de la ruta es obligatorio." });
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const pool = await getConnection()
        const ps = new sql.PreparedStatement(pool);
        ps.input('name', sql.VarChar);
        ps.input('id', sql.Int)
        await ps.prepare('UPDATE Autobus SET name = @name WHERE id = @id');
        const result = await ps.execute({ name, id })

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Ruta no encontrada" })
        } else { res.json({ message: `Ruta actualizada correctamente correctamente` }) }
    } catch (err) {
        console.error("Error al cambiar el nombre de la ruta:", err);
        res.status(500).json({ message: "Error del servidor" });
    } finally {
        if (ps) await ps.unprepare();
    }
}

//Funcion para borrar ruta
export const deleteRuta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const pool = await getConnection();
    const ps = new sql.PreparedStatement(pool);
    ps.input('id', sql.Int);
    await ps.prepare('DELETE FROM Autobus WHERE id = @id');
    const result = await ps.execute({ id });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Ruta no encontrada" });
    }

    res.json({ message: "Ruta eliminada correctamente" });

  } catch (err) {
    console.error("Error al eliminar ruta:", err);
    res.status(500).json({ message: "Error del servidor" });
  } finally {
    if (ps) await ps.unprepare();
  }
};
