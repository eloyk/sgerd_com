const {
    createModalidad,
    updateModalidad,
    deleteModalidad,
    getModalidad
} = require("../controllers/modalidadController");

const express = require("express");

const router = express.Router()

router.get('/modalidad', getModalidad)
router.post('/modalidad', createModalidad)
router.put('/modalidad/:id', updateModalidad)
router.delete('/modalidad/:id', deleteModalidad)

module.exports = router