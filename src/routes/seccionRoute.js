const {
    createSeccion,
    updateSeccion,
    //deleteSeccion,
    getSeccion
} = require("../controllers/seccionController");

const express = require("express");

const router = express.Router()

router.get('/seccion', getSeccion)
router.post('/seccion', createSeccion)
router.put('/seccion/:id', updateSeccion)
    //router.delete('/asiseccion/:id', deleteSeccion)

module.exports = router