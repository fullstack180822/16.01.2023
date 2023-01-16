const assert = require('assert')
const expect = require('chai').expect
const axios = require('axios')
const config = require('config')

const port = config.express.port;


describe('Testing rest-api resource employee' ,() => {

    it('testing get with id 1 should return status 200', async () => {
        // A A A
        const res = await axios.get(`http://localhost:${port}/employee/1`);
        //console.log(res.status);
        expect(res.status).to.equal(200)
        //expect(res.data.args.answer).to.equal('42')
    })
    it('testing get with id 1 should return status 2000', async () => {
        // A A A
        const res = await axios.get(`http://localhost:${port}/employee/1`);
        //console.log(res.status);
        expect(res.status).to.equal(200)
        //expect(res.data.args.answer).to.equal('42')
    })
    before(function() {
        // runs once before the first test in this block
      });
    
      after(function() {
        // runs once after the last test in this block
      });
    
      beforeEach(function() {
        // runs before each test in this block
        // good idea to clean the db and insert rows deisgnated for this test
      });
    
      afterEach(function() {
        // runs after each test in this block
      });
  
})