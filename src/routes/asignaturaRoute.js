const {
    createAsignatura,
    updateAsignatura,
    //deleteAsignatura,
    getAsignatura
} = require("../controllers/asignaturaController");

const express = require("express");

const router = express.Router()

router.get('/asignatura', getAsignatura)
router.post('/asignatura', createAsignatura)
router.put('/asignatura/:id', updateAsignatura)
    //router.delete('/asignatura/:id', deleteAsignatura)

module.exports = router