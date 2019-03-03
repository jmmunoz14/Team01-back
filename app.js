const path = require('path');
const morgan = require('morgan');
var express = require('express');
var mongoose = require('mongoose');

var app = express();

//DB
/*mongoose.connect()
    .then(db=>console.log('BD connected'))
    .catch(err=> console.log(err));
*/

//import router
var indexRouter = require('./routes/index');
var partidasRouter = require('./routes/partidas');

//settings
app.use(express.json());
app.set('views',path.join(__dirname,'views'));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//router
app.use('/', indexRouter);
app.use('/partidas', partidasRouter);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}...`));