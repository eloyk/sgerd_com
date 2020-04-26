const { dbQuery, relaseDatabase } = require('../db/query');

let getAsignatura = async(request, response) => {
    const q = `SELECT a."ID_Asignatura", a."Descripcion" as asig_desc, b."ID_Modalidad", b."Descripcion" as modal_desc 
               FROM "Asignatura" a
               INNER JOIN "Modalidad" b ON a."Modalidad" = b."ID_Modalidad"
               ORDER BY "ID_Asignatura" ASC;`

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

let createAsignatura = async(request, response) => {
    try {

        const insertAsignatura = 'INSERT INTO "Asignatura"("ID_Asignatura","Descripcion","Modalidad") VALUES($1, $2, $3) RETURNING *;'
        let ID_Asignatura = request.body.ID_Asignatura
        let AsignaturaDesc = request.body.AsignaturaDesc
        let Modalidad = request.body.Modalidad

        const Asignaturavalues = [
            ID_Asignatura,
            AsignaturaDesc,
            Modalidad
        ]

        let data = await dbQuery(insertAsignatura, Asignaturavalues)

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

let updateAsignatura = async(request, response) => {

    if (request.method == 'PUT') {
        console.log('PUT rece')
    }

    const q = 'UPDATE "Asignatura" SET "Descripcion" = $1 WHERE "ID_Asignatura" = $2 RETURNING *'

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
        relaseDatabase()
    }
}

//let deleteCurso = async(request, response) => {
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
    getAsignatura,
    createAsignatura,
    updateAsignatura,
    //deleteAsignatura
}