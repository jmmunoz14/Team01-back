require('./config/config');
require('./models/db');

const path = require('path');
const morgan = require('morgan');
var mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rtsIndex = require('./routes/user');
var app = express();
 
// middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);
// start server

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));



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
