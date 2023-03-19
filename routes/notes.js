const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) =>
      res.json(JSON.parse(data))
    );
  });

 notes.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
});
  
notes.post('/', (req,res) =>{
  const { title, text } = req.body;

  if ( req.body ) {
    const newNote = {
      title,
      text,
      note_Id: uuidv4(),
    }
    readAndAppend(newNote, './db/notes.json');
  }
});

notes.delete('/:note_Id', (req, res) =>{
  const noteID = req.body.note_Id;
  readFromFile('./db/notes.json')
  .then((data) => {JSON.parse(data)})
  .then((json) => {
    const result = json.filter((note) => note.note_Id !== noteID)
    writeToFile('./db/notes.json', result);
  });
});

module.exports = notes;