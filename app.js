const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('express');
const session = require('express-session');
const pageRoute = require('../SmarEduNew/routes/pageRoute');
const courseRoute = require('../SmarEduNew/routes/courseRoute');
const categoryRoute = require('../SmarEduNew/routes/categoryRoute');
const userRoute = require('../SmarEduNew/routes/userRoute');

const app = express();



//connect db
mongoose.connect('mongodb://localhost/smartEdu-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    console.log('DB connected');
});

//Template Engine
app.set("view engine", "ejs");


//Global Variables her yerden erişilibilen
global.userIN = null; //false anlamına da gelir js 


//Middlewares
app.use(express.static("public"));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(
    session({
      secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
      resave: false,
      saveUninitialized: true,
    })
  );



app.use('/', pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);
app.use('*', (req, res, next) => { //* hani url gelsede yap demek
    userIN = req.session.userID;
    next();
  });


const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});





