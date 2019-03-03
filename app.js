var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var partidasRouter = require('./routes/partida');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/partidas', partidasRouter);

module.exports = app;
// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening ${port}...`));