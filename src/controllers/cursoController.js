const { dbQuery, relaseDatabase } = require('../db/query');

let getCurso = async(request, response) => {
    const q = `SELECT "ID_Curso", a."Descripcion" as Curso_Desc, "Estado", "ID_Grado", b."Descripcion" as Grado_Desc, "GradoTipo", "ID_Ciclo", c."Descripcion" as Ciclo_Desc, "ID_Modalidad", d."Descripcion" as Modalidad_Desc
               FROM "Curso" a
               INNER JOIN "Grado" b ON a."Grado" = b."ID_Grado"
               INNER JOIN "Ciclo" c ON b."Ciclo" = c."ID_Ciclo"
               INNER JOIN "Modalidad" d ON a."Modalidad" = d."ID_Modalidad"
               WHERE "Estado" = true
               ORDER BY "ID_Curso" ASC;`

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

let createCurso = async(request, response) => {
    try {
        await dbQuery('BEGIN')

        const insertCiclo = 'INSERT INTO "Ciclo"("ID_Ciclo", "Descripcion") VALUES($1, $2) RETURNING "ID_Ciclo"'
        let ID_Ciclo = request.body.ID_Ciclo
        let CicloDesc = request.body.CicloDesc

        const Ciclovalues = [
            ID_Ciclo,
            CicloDesc
        ]

        const cantCiclo = await dbQuery('SELECT count(*) FROM "Ciclo" WHERE "ID_Ciclo" = $1', [ID_Ciclo]);
        let dataIDCiclo;

        if (cantCiclo.rows[0].count >= 1) {
            dataIDCiclo = {
                'rows': [{
                    "ID_Ciclo": request.body.ID_Ciclo
                }]
            };

        } else {
            dataIDCiclo = await dbQuery(insertCiclo, Ciclovalues)
        }

        const insertGrado = 'INSERT INTO "Grado"("ID_Grado", "Descripcion", "Ciclo", "GradoTipo") VALUES ($1, $2, $3, $4) RETURNING "ID_Grado"'
        let ID_Grado = request.body.ID_Grado
        let GradoDesc = request.body.GradoDesc
        let GradoTipo = request.body.GradoTipo

        const GradoValues = [
            ID_Grado,
            GradoDesc,
            dataIDCiclo.rows[0].ID_Ciclo,
            GradoTipo
        ]

        const cantGrado = await dbQuery('SELECT count(*) FROM "Grado" WHERE "ID_Grado" = $1 AND "GradoTipo" = $2', [ID_Grado, GradoTipo]);
        let dataIDGrado;

        if (cantGrado.rows[0].count >= 1) {
            dataIDGrado = {
                'rows': [{
                    "ID_Grado": request.body.ID_Grado
                }]
            };

        } else {
            dataIDGrado = await dbQuery(insertGrado, GradoValues)
        }

        const insertCurso = 'INSERT INTO "Curso"("ID_Curso", "Descripcion", "Grado", "Estado", "Modalidad") VALUES ($1, $2, $3, $4, $5) RETURNING *'
        let ID_Curso = request.body.ID_Curso
        let CursoDesc = request.body.CursoDesc
        let Modalidad = request.body.Modalidad

        const CursoValues = [
            ID_Curso,
            CursoDesc,
            dataIDGrado.rows[0].ID_Grado,
            true,
            Modalidad
        ]

        const cantCurso = await dbQuery('SELECT count(*) FROM "Curso" WHERE "ID_Curso" = $1 AND "Estado" = false', [ID_Grado]);
        let data;

        if (cantCurso.rows[0].count >= 1) {
            data = await dbQuery('UPDATE "Curso" SET "Descripcion" = $2, "Grado" = $3, "Estado" = $4, "Modalidad" = $5 WHERE "ID_Curso" = $1  RETURNING *', CursoValues)
        } else {
            data = await dbQuery(insertCurso, CursoValues)
        }

        await dbQuery('COMMIT')

        response.status(201).json({
            'ok': true,
            resultado: data.rows
        })

    } catch (error) {
        await dbQuery('ROLLBACK')
        return response.status(500).json({
            'ok': false,
            error
        })
    } finally {
        relaseDatabase
    }
}

let updateCurso = async(request, response) => {

    if (request.method == 'PUT') {
        console.log('PUT rece')
    }

    const q = 'UPDATE "Curso" SET "Descripcion" = $1 WHERE "ID_Curso" = $2 RETURNING *'

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

let deleteCurso = async(request, response) => {
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
        relaseDatabase
    }
}

module.exports = {
    getCurso,
    createCurso,
    updateCurso,
    deleteCurso
}