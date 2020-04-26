const { dbQuery, relaseDatabase } = require('../db/query');

let getAnuario = async(request, response) => {
    const q = `SELECT "ID_Anuario_Escolar", "Descripcion", "Nombre_Centro" FROM "Anuario_Escolar"
               INNER JOIN "Datos_Centro" ON "Datos_Centro" = "ID_Datos_Centro"
               ORDER BY "ID_Anuario_Escolar" ASC;`

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

let createAnuario = async(request, response) => {
    try {

        const insertAnuario = 'INSERT INTO "Anuario_Escolar"("ID_Anuario_Escolar", "Descripcion", "Datos_Centro") VALUES($1, $2, $3) RETURNING *;'
        let ID_Anuario_Escolar = request.body.ID_Anuario_Escolar
        let Descripcion = request.body.Descripcion
        let Datos_Centro = request.body.Datos_Centro

        const Anuariovalues = [
            ID_Anuario_Escolar,
            Descripcion,
            Datos_Centro
        ]

        let data = await dbQuery(insertAnuario, Anuariovalues)

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

let updateAnuario = async(request, response) => {

    if (request.method == 'PUT') {
        console.log('PUT rece')
    }

    const q = 'UPDATE "Anuario_Escolar" SET "Descripcion" = $1 WHERE "ID_Anuario_Escolar" = $2 RETURNING *'

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
    getAnuario,
    createAnuario,
    updateAnuario,
    //deleteAsignatura
}