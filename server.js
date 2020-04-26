const express = require('express');
const logger = require('morgan');
const cursoRoute = require('./src/routes/cursoRoute');
const modalidadRoute = require('./src/routes/modalidadRoute');
const centroRoute = require('./src/routes/centroRoute');
const docenteRoute = require('./src/routes/docenteRoute');
const asignaturaRoute = require('./src/routes/asignaturaRoute');
const anuarioRoute = require('./src/routes/anuarioRoute');
const seccionRoute = require('./src/routes/seccionRoute');
const salidasObtativasRoute = require('./src/routes/salidasObtativasRoute');
const asigCursoSeccionAnioRoute = require('./src/routes/asigCursoSeccionAnioRoute');
const cargaAcademicaRoute = require('./src/routes/cargaAcademicaRoute');
const { urlencoded, json } = require('body-parser');

const app = express()
var port = process.env.PORT || 3000

app.use(logger('dev'))

app.use(urlencoded({ extended: true }))

app.use(json())

app.get('/', (resquest, response) => {
    response.json({
        info: "NodeJs, ExpressJS, and PosgreSQL API"
    })
})

app.use('/api/', cursoRoute)
app.use('/api/', modalidadRoute)
app.use('/api/', centroRoute)
app.use('/api/', docenteRoute)
app.use('/api/', asignaturaRoute)
app.use('/api/', anuarioRoute)
app.use('/api/', seccionRoute)
app.use('/api/', salidasObtativasRoute)
app.use('/api/', asigCursoSeccionAnioRoute)
app.use('/api/', cargaAcademicaRoute)

app.listen(port, () => {
    console.log('Server is listening in port ' + port)
})

module.exports = app