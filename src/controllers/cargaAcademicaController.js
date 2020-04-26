const { dbQuery, relaseDatabase } = require('../db/query');

let getCargaAcademica = async(request, response) => {
    const q = `SELECT a."ID_Carga_Academica_anio", b."Descripcion" as asignatura,
               e."Descripcion" as CursoDesc, f."Descripcion" as SeccionDesc, 
               a."Num_Hora", d."Nombres", d."Apellidos", d."Area_Especializacion", 
               d."Cargo", a."Indicador_Asignatura_Titular", 
               g."Descripcion" as Anuario_Escolar, h."Nombre_Centro", h."Jornada"
               FROM "Carga_Academica_anio" a
               INNER JOIN "Asignatura" b ON a."Asignatura" = b."ID_Asignatura"
               INNER JOIN "Asig_Curso_seccion_por_anio" c ON a."Asig_Curso_seccion_por_anio" = c."ID_Asig_Curso_seccion_por_anio"
               INNER JOIN "Docente" d ON a."Docente" = d."ID_Docente"
               INNER JOIN "Curso" e ON c."Curso" = e."ID_Curso"
               INNER JOIN "Seccion" f ON c."Seccion" = f."ID_Seccion"
               INNER JOIN "Anuario_Escolar" g ON c."Anuario_Escolar" = g."ID_Anuario_Escolar"
               INNER JOIN "Datos_Centro" h ON g."Datos_Centro" = h."ID_Datos_Centro"
               WHERE c."Ind_Curso_Actual" = 'A'
               ORDER BY "ID_Carga_Academica_anio" ASC;`

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

let createCargaAcademica = async(request, response) => {
    try {

        const insertCargaAcademicaAnio = `INSERT INTO "Carga_Academica_anio"("ID_Carga_Academica_anio","Asignatura","Asig_Curso_seccion_por_anio","Num_Hora","Docente","Indicador_Asignatura_Titular") 
                                                                               VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`

        let IDCargaAcademicaAnio = request.body.IDCargaAcademicaAnio
        let Asignatura = request.body.Asignatura
        let AsigCursoSeccionAnio = request.body.AsigCursoSeccionAnio
        let NumHora = request.body.NumHora
        let Docente = request.body.Docente
        let IndicadorAsignaturaTitular = request.body.IndicadorAsignaturaTitular

        const CargaAcademicaAnioValues = [
            IDCargaAcademicaAnio,
            Asignatura,
            AsigCursoSeccionAnio,
            NumHora,
            Docente,
            IndicadorAsignaturaTitular
        ]

        let data = await dbQuery(insertCargaAcademicaAnio, CargaAcademicaAnioValues)

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

let updateCargaAcademica = async(request, response) => {

    if (request.method == 'PUT') {
        console.log('PUT rece')
    }

    const q = 'UPDATE "Carga_Academica_anio" SET "Num_Hora" = $1 WHERE "ID_Carga_Academica_anio" = $2 RETURNING *'

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

let deleteCargaAcademica = async(request, response) => {
    const q = 'DELETE FROM "Carga_Academica_anio" WHERE "ID_Carga_Academica_anio" = $1 RETURNING *'

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
    getCargaAcademica,
    createCargaAcademica,
    updateCargaAcademica,
    deleteCargaAcademica
}