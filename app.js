const express = require('express');
const pageRoute = require('../SmarEduNew/routes/pageRoute');
const app = express();

//Template Engine
app.set("view engine", "ejs");


//Middlewares
app.use(express.static("public"));




const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});


app.use('/',pageRoute);;



