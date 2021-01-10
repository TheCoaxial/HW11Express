// Requiring express
var express = require("express");



//basic express set up
var app = express();

//setting initial port
var PORT = process.env.PORT || 3001;

// Middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Below will be the routes when they're created

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Above will be the routes when they're created

//starts server
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});
