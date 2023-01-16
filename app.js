// index.js
const express = require('express')
const router = express.Router()
const path = require('path')
const url = require('url')
const cors = require('cors')
const { response } = require('express')
const config = require('config')
const employeesRouter = require('./routes/employees').router
const logger = require('./logger/my_logger')

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const port = config.express.port;

const emp_repo = require('./dal/emp_repo')

logger.info('test1')

const app = express()

// to use body parameters
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static(path.join('.', '/static/'))) // /static/index.html
// page1.html

app.set('view engine', 'ejs')

app.get('/home', (req, res) => res.render('home'))

app.get('/emp', async (req, res) => res.render('emp', {
  employees : await emp_repo.get_all_emp()
}))

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
    logger.info(`======================== system up ===========================`)
})

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description:"A simple Express Library API",
      },
      servers: [
        {
          url: "http://localhost:8080/",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

  app.use('/employee', employeesRouter)
  
  logger.debug('this is a debug message')