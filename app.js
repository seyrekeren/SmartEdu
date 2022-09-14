const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('../SmarEduNew/routes/pageRoute');
const courseRoute = require('../SmarEduNew/routes/courseRoute');
const app = express();



//connect db
mongoose.connect('mongodb://localhost/smartEdu-db').then(() => {
    console.log('DB connected');
});

//Template Engine
app.set("view engine", "ejs");


//Middlewares
app.use(express.static("public"));




const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});


app.use('/', pageRoute);
app.use('courses',courseRoute);



