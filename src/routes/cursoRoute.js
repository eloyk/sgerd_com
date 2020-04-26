const {
    createCurso,
    updateCurso,
    deleteCurso,
    getCurso
} = require("../controllers/cursoController");

const express = require("express");

const router = express.Router()

router.get('/curso', getCurso)
router.post('/curso', createCurso)
router.put('/curso/:id', updateCurso)
router.delete('/curso/:id', deleteCurso)

module.exports = router