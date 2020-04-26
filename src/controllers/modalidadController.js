const { dbQuery, relaseDarabese } = require('../db/query');

let getModalidad = async(request, response) => {
    const q = 'SELECT * FROM "Modalidad" ORDER BY "ID_Modalidad" ASC;'

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

let createModalidad = async(request, response) => {
    try {

        const insertModalidad = 'INSERT INTO "Modalidad"("ID_Modalidad", "Descripcion") VALUES($1, $2) RETURNING *'
        const ID_Modalidad = request.body.ID_Modalidad
        const ModalidadDesc = request.body.ModalidadDesc

        const Modalidadvalues = [
            ID_Modalidad,
            ModalidadDesc,
        ]

        const data = await dbQuery(insertModalidad, Modalidadvalues)

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

let updateModalidad = async(request, response) => {

    if (request.method == 'PUT') {
        console.log('PUT rece')
    }

    const q = 'UPDATE "Modalidad" SET "Descripcion" = $1 WHERE "ID_Modalidad" = $2 RETURNING *'

    const id = parseInt(request.params.id)

    const {
        ModalidadDesc
    } = request.body

    const params = [
        ModalidadDesc,
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

let deleteModalidad = async(request, response) => {
    const q = 'DELETE FROM "Modalidad" WHERE "ID_Modalidad" = $1 RETURNING "ID_Modalidad", "Descripcion"'

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
    getModalidad,
    createModalidad,
    updateModalidad,
    deleteModalidad
}