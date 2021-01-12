// Require fs
const fs = require('fs');


module.exports = function(app){

    fs.readFile("db/db.json","utf8", (err,data) => {
        if (err) throw err;

        let db = JSON.parse(data);

        //Get route
        app.get("/api/notes", function(req, res){
            res.json(JSON.parse(db));
            res.json(db[req.params.id]);
        });

        //Post route
        app.post("/api/notes", function(req, res){
            let id = db.length + 1;
            let newNote = { title: req.body.title, text: req.body.text, id: id }; 
            db.push(newNote);
            updateNotes();
           

            return console.log("Added note " + newNote.title);
        })

        function updateNotes() {
            fs.writeFile("db/db.json", JSON.stringify(db),err =>{
                    if (err) throw err;    
            });
        }

    })

}