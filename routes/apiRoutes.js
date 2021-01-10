// Require fs
const fs = require('fs');


module.exports = function(app){

    fs.readFile("../db/db.json","utf8", (err,data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        //Get route
        app.get("/api/notes", function(req, res){
            res.json(notes);
        });

        //Post route
        app.post("/api/notes", function(req, res){
            let newNote = req.body;
            notes.push(newNote);
            return console.log("Added note " + newNote.title);
        })

    })

}