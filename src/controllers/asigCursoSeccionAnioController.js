const { dbQuery, relaseDatabase } = require('../db/query');

let getAsigCursoSeccionAnio = async(request, response) => {
    const q = `SELECT a."ID_Asig_Curso_seccion_por_anio" as id, a."Capacidad_Aula", 
               a."Capacidad_Lim_Aula", b."Descripcion" as CursoDesc,
               c."Descripcion" as SeccionDesc, d."Descripcion" as AnuarioEscolarDesc,
               e."Descripcion" as SalidasObtativasDesc, f."Nombre_Centro"
               FROM "Asig_Curso_seccion_por_anio" a
               INNER JOIN "Curso" b ON a."Curso" = b."ID_Curso"
               INNER JOIN "Seccion" c ON a."Seccion" = c."ID_Seccion"
               INNER JOIN "Anuario_Escolar" d ON a."Anuario_Escolar" = d."ID_Anuario_Escolar"	   
               INNER JOIN "Salidas_Obtativas" e ON a."Salidas_Obtativas" = e."ID_Salidas_Obtativas"	   
               INNER JOIN "Datos_Centro" f ON a."Datos_Centro" = f."ID_Datos_Centro"	   
               ORDER BY "ID_Asig_Curso_seccion_por_anio" ASC;`

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

let createAsigCursoSeccionAnio = async(request, response) => {
    try {

        const insertAsigCursoSeccionAnio = `INSERT INTO "Asig_Curso_seccion_por_anio"("ID_Asig_Curso_seccion_por_anio", "Curso", "Seccion", "Anuario_Escolar", "Salidas_Obtativas", "Datos_Centro", "Capacidad_Aula", "Capacidad_Lim_Aula") 
                                                                               VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`

        let IDAsigCursoSeccionAnio = request.body.IDAsigCursoSeccionAnio
        let Curso = request.body.Curso
        let Seccion = request.body.Seccion
        let AnuarioEscolar = request.body.AnuarioEscolar
        let SalidasObtativas = request.body.SalidasObtativas
        let DatosCentro = request.body.DatosCentro
        let CapacidadAula = request.body.CapacidadAula
        let CapacidadLimAula = request.body.CapacidadLimAula

        const AsigCursoSeccionAnioValues = [
            IDAsigCursoSeccionAnio,
            Curso,
            Seccion,
            AnuarioEscolar,
            SalidasObtativas,
            DatosCentro,
            CapacidadAula,
            CapacidadLimAula
        ]

        let data = await dbQuery(insertAsigCursoSeccionAnio, AsigCursoSeccionAnioValues)

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

let updateAsigCursoSeccionAnio = async(request, response) => {

    if (request.method == 'PUT') {
        console.log('PUT rece')
    }

    const q = 'UPDATE "Asig_Curso_seccion_por_anio" SET "CapacidadAula" = $1 WHERE "ID_Asig_Curso_seccion_por_anio" = $2 RETURNING *'

    const id = parseInt(request.params.id)

    const {
        CapacidadAula
    } = request.body

    const params = [
        CapacidadAula,
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

let deleteAsigCursoSeccionAnio = async(request, response) => {
    const q = 'DELETE FROM "Asig_Curso_seccion_por_anio" WHERE "ID_Asig_Curso_seccion_por_anio" = $1 RETURNING *'

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
    getAsigCursoSeccionAnio,
    createAsigCursoSeccionAnio,
    updateAsigCursoSeccionAnio,
    deleteAsigCursoSeccionAnio
}