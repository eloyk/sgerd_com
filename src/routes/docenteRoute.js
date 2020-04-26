const {
    createDocente,
    updateDocente,
    deleteDocente,
    getDocente
} = require("../controllers/docenteController");

const express = require("express");

const router = express.Router()

router.get('/docente', getDocente)
router.post('/docente', createDocente)
router.put('/docente/:id', updateDocente)
router.delete('/docente/:id', deleteDocente)

module.exports = router