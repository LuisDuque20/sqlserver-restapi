import sql from 'mssql'

const dbSettings = {
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    server: `${process.env.DB_HOST}`,
    port:Number(process.env.PORT),
    database: `${process.env.DB_NAME}`,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}

export const getConnection = async () => {
    try {

        const pool = await sql.connect(dbSettings)

        return pool

    } catch (error) {
        console.log(error)
    }
}

