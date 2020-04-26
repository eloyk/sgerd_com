const { dbQuery, relaseDatabase } = require('../db/query');

let getDocente = async(request, response) => {
    const q = `SELECT * FROM "Docente"
               WHERE "EstadoDocente" = true
               ORDER BY "ID_Docente" ASC;`

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

let createDocente = async(request, response) => {
    try {

        const insertDocente = `INSERT INTO "Docente"("ID_Docente","Nombres","Apellidos","Cargo","Datos_Centro","Foto","Area_Especializacion","EstadoDocente")
                               VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`

        let ID_Docente = request.body.ID_Docente
        let Nombres = request.body.Nombres
        let Apellidos = request.body.Apellidos
        let Cargo = request.body.Cargo
        let Datos_Centro = request.body.Datos_Centro
        let Foto = request.body.Foto
        let Area_Especializacion = request.body.Area_Especializacion

        const Docentevalues = [
            ID_Docente,
            Nombres,
            Apellidos,
            Cargo,
            Datos_Centro,
            Foto,
            Area_Especializacion,
            true
        ]

        const data = await dbQuery(insertDocente, Docentevalues)

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

let updateDocente = async(request, response) => {

    if (request.method == 'PUT') {
        console.log('PUT rece')
    }

    const q = `UPDATE "Docente" SET "Nombres" = $1, "Apellidos" = $2, "Cargo" = $3, "Datos_Centro" = $4, "Foto" = $5, "Area_Especializacion" = $6
               WHERE "ID_Docente" = $7 RETURNING *`

    const id = parseInt(request.params.id)

    const {
        Nombres,
        Apellidos,
        Cargo,
        Datos_Centro,
        Foto,
        Area_Especializacion
    } = request.body

    const params = [
        Nombres,
        Apellidos,
        Cargo,
        Datos_Centro,
        Foto,
        Area_Especializacion,
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

let deleteDocente = async(request, response) => {
    const q = 'UPDATE "Docente" SET "EstadoDocente" = false WHERE "ID_Docente" = $1 RETURNING *'

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
        relaseDatabase
    }
}

module.exports = {
    getDocente,
    createDocente,
    updateDocente,
    deleteDocente
}