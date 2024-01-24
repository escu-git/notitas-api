const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')

router.get(`/getById`, notesController.getNotasById);
router.post(`/create`, (req, res, next)=>notesController.createNota(req.body, res));

module.exports = router;