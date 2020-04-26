const {
    createAsigCursoSeccionAnio,
    updateAsigCursoSeccionAnio,
    deleteAsigCursoSeccionAnio,
    getAsigCursoSeccionAnio
} = require("../controllers/asigCursoSeccionAnioController");

const express = require("express");

const router = express.Router()

router.get('/asigCursoSeccion', getAsigCursoSeccionAnio)
router.post('/asigCursoSeccion', createAsigCursoSeccionAnio)
router.put('/asigCursoSeccion/:id', updateAsigCursoSeccionAnio)
router.delete('/asigCursoSeccion/:id', deleteAsigCursoSeccionAnio)

module.exports = router