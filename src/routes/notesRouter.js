const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')

router.get(`/getAllNotes`,(req, res, next)=> notesController.getAllNotes(req, res));
router.get(`/getNoteById`, (req, res, next)=>notesController.getNotasById(req.body));
router.post(`/createNote`, (req, res, next)=>notesController.createNota(req, res));
router.delete(`/deleteNote/:id`, (req, res, next)=>notesController.deleteNote(req, res));


module.exports = router;