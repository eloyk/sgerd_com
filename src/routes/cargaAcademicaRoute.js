const {
    createCargaAcademica,
    updateCargaAcademica,
    deleteCargaAcademica,
    getCargaAcademica
} = require("../controllers/cargaAcademicaController");

const express = require("express");

const router = express.Router()

router.get('/cargaAcademica', getCargaAcademica)
router.post('/cargaAcademica', createCargaAcademica)
router.put('/cargaAcademica/:id', updateCargaAcademica)
router.delete('/cargaAcademica/:id', deleteCargaAcademica)

module.exports = router