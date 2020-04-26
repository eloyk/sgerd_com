const {
    createSalidasObt,
    updateSalidasObt,
    //deleteSalidasObt,
    getSalidasObt
} = require("../controllers/salidasObtativasController");

const express = require("express");

const router = express.Router()

router.get('/SalidasObt', getSalidasObt)
router.post('/SalidasObt', createSalidasObt)
router.put('/SalidasObt/:id', updateSalidasObt)
    //router.delete('/SalidasObt/:id', deleteSalidasObt)

module.exports = router