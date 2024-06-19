const express = require('express');
const { getnotes, addNote, updateNote, deleteNote } = require('../Controllers/notesController');
const notesRouter = express.Router();

notesRouter.use(express.json());

notesRouter.get('/usernotes',getnotes);
notesRouter.post('/addnote',addNote);
notesRouter.put('/updatenote/:id',updateNote);
notesRouter.delete('/deletenote/:id',deleteNote);

module.exports = notesRouter;