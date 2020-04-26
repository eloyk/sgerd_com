const {
    createAnuario,
    updateAnuario,
    //deleteAnuario,
    getAnuario
} = require("../controllers/anuarioController");

const express = require("express");

const router = express.Router()

router.get('/anuario', getAnuario)
router.post('/anuario', createAnuario)
router.put('/anuario/:id', updateAnuario)
    //router.delete('/asignatura/:id', deleteAnuario)

module.exports = router