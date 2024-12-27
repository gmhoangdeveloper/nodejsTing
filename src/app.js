const createError = require('http-errors');
require('express-async-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const i18n = require('i18n');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require("cors");
const usersRouter = require('./routes/user.route');


const app = express();

i18n.configure({
  locales: ['en', 'vi'],
  defaultLocale: 'vi',
  directory: path.join(__dirname, '../locales')
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Ting",
        url: "https://ting.vn",
        email: "ting@gmail.com",
      },
    },
    servers: [
    
    ],
  },
  apis: ['docs/*.doc.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(i18n.init);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));
app.use(cors());
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  res.status(err.status || 500);
  res.json({
    error: {
        status: err.status || 500,
        message: err.message
    }
  });
});


module.exports = app;
