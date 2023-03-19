const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) =>
      res.json(JSON.parse(data))
    );
  });
  
notes.post('/', (req,res) =>{
  const { title, text } = req.body;

  if ( req.body ) {
    const newNote = {
      title,
      text,
      note_Id: uuid(),
    }

    readAndAppend(newNote, './db/notes.json');
  }
});

notes.delete('/:note_Id', (req, res) =>{
  const noteID = req.params.note_Id;
  readFromFile('./db/notes.json')
  .then((data) => JSON.parse(data))
  .then((json) => {
    const result = json.filter((note) => note.note_Id != noteID)
    writeToFile('.db/notes.json', result);
  });
});

module.exports = notes;