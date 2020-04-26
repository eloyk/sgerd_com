const { dbQuery, relaseDatabase } = require('../db/query');

let getCentro = async(request, response) => {
    const q = `SELECT * FROM "Datos_Centro"
               INNER JOIN "Modalidad" ON "Modalidad" = "ID_Modalidad"
               ORDER BY "ID_Modalidad" ASC;`

    try {
        let data = await dbQuery(q)
        if (data.rowCount === 0) {
            data = {
                rows: [{
                    mensaje: 'Lo sentimos no hay registro para mostrar, por favor pongase en contacto con la administración'
                }]
            };
        }

        response.status(200).json({
            'ok': true,
            resultado: data.rows
        })
    } catch (error) {
        return response.status(500).json({
            'ok': false,
            error
        })
    }
}

let createCentro = async(request, response) => {
    try {

        const insertDatos_Centro = `INSERT INTO "Datos_Centro"("ID_Datos_Centro","Nombre_Centro","Codigo","Ubicacion","Sector","Zona","Jornada","Modalidad","Foto","Lema") 
                             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`

        let ID_Datos_Centro = request.body.ID_Datos_Centro
        let Nombre_Centro = request.body.Nombre_Centro
        let Codigo = request.body.Codigo
        let Ubicacion = request.body.Ubicacion
        let Sector = request.body.Sector
        let Zona = request.body.Zona
        let Jornada = request.body.Jornada
        let Modalidad = request.body.Modalidad
        let Foto = request.body.Foto
        let Lema = request.body.Lema

        const Datos_Centrovalues = [
            ID_Datos_Centro,
            Nombre_Centro,
            Codigo,
            Ubicacion,
            Sector,
            Zona,
            Jornada,
            Modalidad,
            Foto,
            Lema
        ]

        const data = await dbQuery(insertDatos_Centro, Datos_Centrovalues)

        response.status(201).json({
            'ok': true,
            resultado: data.rows
        })

    } catch (error) {
        return response.status(500).json({
            'ok': false,
            error
        })
    } finally {
        relaseDatabase
    }
}

let updateCentro = async(request, response) => {

    if (request.method == 'PUT') {
        console.log('PUT rece')
    }

    const q = `UPDATE "Datos_Centro" SET "Nombre_Centro" = $1,"Codigo" = $2,"Ubicacion" = $3,"Sector" = $4,"Zona" = $5,"Jornada" = $6,"Foto" = $7,"Lema" = $8 
    WHERE "ID_Datos_Centro" = $9 RETURNING *`

    const id = parseInt(request.params.id)

    const {
        Nombre_Centro,
        Codigo,
        Ubicacion,
        Sector,
        Zona,
        Jornada,
        Foto,
        Lema
    } = request.body

    const params = [
        Nombre_Centro,
        Codigo,
        Ubicacion,
        Sector,
        Zona,
        Jornada,
        Foto,
        Lema,
        id
    ]

    try {
        const data = await dbQuery(q, params)
        response.status(200).json({
            'ok': true,
            resultado: data.rows
        })
    } catch (error) {
        return response.status(500).json({
            'ok': false,
            error
        })
    } finally {
        relaseDatabase
    }
}

let deleteCentro = async(request, response) => {
    const q = 'UPDATE "Curso" SET "Estado" = false WHERE "ID_Curso" = $1 RETURNING "ID_Curso", "Descripcion"'

    const id = parseInt(request.params.id)

    try {
        const data = await dbQuery(q, [id])
        response.status(200).json({
            'ok': true,
            "curso eliminado": data.rows
        })
    } catch (error) {
        return response.status(500).json({
            'ok': false,
            error
        })
    } finally {
        relaseDarabese
    }
    return console.log('Hola');
}

module.exports = {
    getCentro,
    createCentro,
    updateCentro,
    deleteCentro
}