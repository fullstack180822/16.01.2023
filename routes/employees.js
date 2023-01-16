const express = require('express')
const router = express.Router()
const emp_repo = require('../dal/emp_repo')
const logger = require('../logger/my_logger')

/**
*  @swagger
*  components:
*     schemas:
*       Employee:
*         type: object
*         required:
*           - id
*           - name
*           - age
*           - address
*           - salary
*         properties:
*           id:
*             type: integer
*             description: The auto-generated id of the employee.
*           name:
*             type: string
*             description: The name of the employee.
*           age:
*             type: int
*             description: age of the employee
*           address:
*             type: string
*             description: The address of the employee.
*           salary:
*             type: int
*             description: salary of the employee
*         example:
*           name: Kim
*           age: 22
*           address: South-Hall
*           salary: 45000
*/

/**
*  @swagger
*  tags:
*    name: Employees
*    description: API to manage your company.
*/

// ========================================== REST
// REST BASIC:
// 1.GET 2. GET by ID 3.POST (one-item) 4.PUT (update/replace/insert) 5.DELETE 6.PATCH (update only)
// EXTRA ==>
//  7.POST-MANY (json array)
//  8 SMART GET query params
// GRAPH-QL
// get all

/**
*  @swagger
*   /employee/:
*     get:
*       summary: List all of the employees
*       tags: [Employees]
*       responses:
*         "200":
*           description: The list of employees.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Employee'
*/
router.get('/', async (req, resp) => {
    try {
        const employees = await emp_repo.get_all_emp();//connectedKnex('employee').select('*');
        console.log(employees);
        resp.status(200).json({ employees })
    }
    catch (err) {
        resp.status(500).json({ "error": err.message })
    }
})

// get end point by id
router.get('/:id', async (req, resp) => {
    try {
        logger.debug(`[employees router][router.get] parameter :id = ${req.params.id}`)
        const employees = await emp_repo.get_emp_by_id(req.params.id)
        resp.status(200).json(employees)
    }
    catch (err) {
        logger.error(`[employees router][router.get] ${err}`)
        resp.status(500).json({ "error": err.message })
    }
})

function is_valid_employee(obj) {
    const result =  obj.hasOwnProperty('name') && obj.hasOwnProperty('age') && 
        obj.hasOwnProperty('address') && obj.hasOwnProperty('salary') ;
    if (!result) {
        logger.error(`bad object was recieved. ${JSON.stringify(obj)}`)
    }
    return result;
}

// ADD
router.post('/', async (req, resp) => {
    console.log(req.body);
    const employee = req.body
    try {
        if (! is_valid_employee (employee)) {
            resp.status(400).json({ error: 'values of employee are not llegal'})
            return
        }
        const result = await emp_repo.insert_emp(employee)
        resp.status(201).json({
             new_employee : { ...employee, ID: result[0].id },
             url: `http://localhost:8080/employee/${result[0].id}` 
            })
    }
    catch (err) {
        console.log(err);
        logger.error(`error during POST in employees router. employee = ${JSON.stringify(employee)} ${err.message}`)
        resp.status(500).json({ "error": err.message })
    }
})

// PUT -- UPDATE/replace (or insert)
router.put('/:id', async (req, resp) => {
    console.log(req.body);
    const employee = req.body
    try {
        if (! is_valid_employee (employee)) {
            resp.status(400).json({ error: 'values of employee are not llegal'})
            return
        }
        const result = await emp_repo.update_emp(req.params.id, employee)
        resp.status(200).json({
             status: 'updated',
             'how many rows updated': result
            })
    }
    catch (err) {
        logger.error(`[employees router][router.get] ERROR: error during PUT.` +
                     `employee = ${JSON.stringify(employee)} message = ${err.message} req.body = ${req.body}`); 
        resp.status(500).json({ "error": err.message })
    }
})
// DELETE 
router.delete('/:id', async (req, resp) => {
    try {
        const result = await emp_repo.del_emp_by_id(req.params.id)
        resp.status(200).json({
            status: 'success',
            "how many deleted": result
        })
    }
    catch (err) {
        resp.status(500).json({ "error": err.message })
    }

})
// PATCH -- UPDATE 
router.patch('/:id', (req, resp) => {
    console.log(req.params.id);
    // actually delete ... later
    // response
    resp.writeHead(200)
    resp.end('Successfully updated patched')
})


module.exports = { router, is_valid_employee }
