const { dbQuery, relaseDatabase } = require('../db/query');

let getSalidasObt = async(request, response) => {
    const q = `SELECT * FROM "Salidas_Obtativas"
               ORDER BY "ID_Salidas_Obtativas" ASC;`

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

let createSalidasObt = async(request, response) => {
    try {

        const insertSalidasObtativas = 'INSERT INTO "Salidas_Obtativas"("ID_Salidas_Obtativas", "Descripcion") VALUES($1, $2) RETURNING *;'
        let ID_SalidasObtativas = request.body.ID_SalidasObtativas
        let Descripcion = request.body.Descripcion

        const SalidasObtativasValues = [
            ID_SalidasObtativas,
            Descripcion
        ]

        let data = await dbQuery(insertSalidasObtativas, SalidasObtativasValues)

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

let updateSalidasObt = async(request, response) => {

    if (request.method == 'PUT') {
        console.log('PUT rece')
    }

    const q = 'UPDATE "Salidas_Obtativas" SET "Descripcion" = $1 WHERE "ID_Salidas_Obtativas" = $2 RETURNING *'

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

//let deleteSalidasObt = async(request, response) => {
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
    getSalidasObt,
    createSalidasObt,
    updateSalidasObt,
    //deleteSalidasObt
}