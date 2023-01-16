const knex = require('knex')
const config = require('config')

const connectedKnex = knex({
    client: 'pg',
    version: config.db.version,
    connection: {
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    }
})

const get_all_emp = () => {
    return connectedKnex('employee').select('*');
}

const get_emp_by_id = id => {
    return connectedKnex('employee').select('*').where('id', id).first()
}

const insert_emp = employee => {
    //logger.debug(`emp_repo func insert_emp. parameter: ${JSON.stringify(employee)}`)
    return connectedKnex('employee').returning('id').insert(employee)
}

const update_emp = (id, employee) => {
    return connectedKnex('employee').where('id', id).update(employee)
}

const del_emp_by_id = (id) => {
    return connectedKnex('employee').where('id', id).del()
}

module.exports = {
    get_all_emp,
    get_emp_by_id,
    insert_emp,
    update_emp, 
    del_emp_by_id
}

