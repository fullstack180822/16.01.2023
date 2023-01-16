const assert = require('assert')
const expect = require('chai').expect
const is_valid_employee = require('./employees').is_valid_employee

/*
const connectedKnex_testing = knex({
    client: 'pg',
    version: config.test_input_db.version,
    connection: {
        host: config.test_input_db.host,
        user: config.test_input_db.user,
        password: config.test_input_db.password,
        database: config.test_input_db.database
    }
})

describe('Testing is_valid_employee fucntion which asserts the employee structrure in the router' ,() => {
    it('positive flow', () => {
        const all_rows = await connectedKnex('test_inputs_for_func1').select('*');
        for (one_row in all_rows) {
            /// .........
            // actual = calc.add ( one_row.a, one_row.b )
            // assert (actual, one_row.expected)
            // actual = calc.add ( -100000000.5, 2 )
            // assert (actual, 7)
        }
    })
*/

describe('Testing is_valid_employee fucntion which asserts the employee structrure in the router' ,() => {
    it('positive flow', () => {
        const input = 
        {
            "name": "Paul",
            "age": 32,
            "address": "California",
            "salary": 20000
        }
        assert.strictEqual(is_valid_employee(input), true)
    })
    it('negative flow -- missing name should return false from function is_valid_employee', () => {
        const input = 
        {
            "age": 32,
            "address": "California",
            "salary": 20000
        }
        assert.strictEqual(is_valid_employee(input), false)
    })

    it('negative flow -- missing age', () => {
        const input = 
        {
            "name": "Paul",
            "address": "California",
            "salary": 20000
        }
        assert.strictEqual(is_valid_employee(input), false)
    })

    it('negative flow -- missing address', () => {
        const input = 
        {
            "name": "Paul",
            "age": 32,
            "salary": 20000
        }
        assert.strictEqual(is_valid_employee(input), false)
    })

    it('negative flow -- missing salary', () => {
        const input = 
        {
            "name": "Paul",
            "age": 32,
            "address": "California",
        }
        assert.strictEqual(is_valid_employee(input), false)
    })

})