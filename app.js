const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('express');
const pageRoute = require('../SmarEduNew/routes/pageRoute');
const courseRoute = require('../SmarEduNew/routes/courseRoute');
const categoryRoute = require('../SmarEduNew/routes/categoryRoute');
const userRoute = require('../SmarEduNew/routes/userRoute');

const app = express();



//connect db
mongoose.connect('mongodb://localhost/smartEdu-db').then(() => {
    console.log('DB connected');
});

//Template Engine
app.set("view engine", "ejs");


//Middlewares
app.use(express.static("public"));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



app.use('/', pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);


const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});





