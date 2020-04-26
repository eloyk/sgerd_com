const { dbQuery, relaseDatabase } = require('../db/query');

let getSeccion = async(request, response) => {
    const q = `SELECT "ID_Seccion", "Descripcion", "Nombre_Centro" FROM "Seccion"
               INNER JOIN "Datos_Centro" ON "Datos_Centro" = "ID_Datos_Centro"
               ORDER BY "ID_Seccion" ASC;`

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

let createSeccion = async(request, response) => {
    try {

        const insertSeccion = 'INSERT INTO "Seccion"("ID_Seccion","Descripcion","Datos_Centro") VALUES($1, $2, $3) RETURNING *;'
        let ID_Seccion = request.body.ID_Seccion
        let Descripcion = request.body.Descripcion
        let Datos_Centro = request.body.Datos_Centro

        const Seccionvalues = [
            ID_Seccion,
            Descripcion,
            Datos_Centro
        ]

        let data = await dbQuery(insertSeccion, Seccionvalues)

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

let updateSeccion = async(request, response) => {

    if (request.method == 'PUT') {
        console.log('PUT rece')
    }

    const q = 'UPDATE "Seccion" SET "Descripcion" = $1 WHERE "ID_Seccion" = $2 RETURNING *'

    const id = parseInt(request.params.id)

    const {
        Descripcion
    } = request.body

    const params = [
        Descripcion,
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

//let deleteAnuario = async(request, response) => {
//    const q = 'UPDATE "Curso" SET "Estado" = false WHERE "ID_Curso" = $1 RETURNING "ID_Curso", "Descripcion"'
//
//    const id = parseInt(request.params.id)
//
//    try {
//        const data = await dbQuery(q, [id])
//        response.status(200).json({
//            'ok': true,
//            "curso eliminado": data.rows
//        })
//    } catch (error) {
//        return response.status(500).json({
//            'ok': false,
//            error
//        })
//    } finally {
//        relaseDatabase()
//    }
//}

module.exports = {
    getSeccion,
    createSeccion,
    updateSeccion,
    //deleteAsignatura
}