const {
    createCentro,
    updateCentro,
    deleteCentro,
    getCentro
} = require("../controllers/centroController");

const express = require("express");

const router = express.Router()

router.get('/centro', getCentro)
router.post('/centro', createCentro)
router.put('/centro/:id', updateCentro)
router.delete('/centro/:id', deleteCentro)

module.exports = router