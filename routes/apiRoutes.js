// Require fs
const fs = require('fs');
let db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = function(app){
        
        //Get route
        app.get("/api/notes", function(req, res){
            res.json(db);
            
        });

         // Should Retrieve a note with specific id
         app.get("/api/notes/:id", function(req,res) {           
            res.json(db[req.params.id]);
        });

        //Post route
        app.post("/api/notes", function(req, res){
            let id = db.length;
            let newNote = { title: req.body.title, text: req.body.text, id: id }; 
            db.push(newNote);
            updateNotes();
            res.json(db);
           

            return console.log("Added note " + newNote.title);
        });

       

         //Should Delete a note with specific id
         app.delete("/api/notes/:id", function(req, res) {
           
            let newId = 0;
            
            db = db.filter(currentNote => {
            return currentNote.id !=  req.params.id;
        });
            for (currentNote of db) {
            currentNote.id = newId.toString();
            newId++;
        };
            updateNotes();
            
            res.json(db);
        });

        function updateNotes() {
            fs.writeFile("db/db.json", JSON.stringify(db),err =>{
                if (err) throw err;    
            });
        }

    

}