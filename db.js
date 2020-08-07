const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite'
  },
  useNullAsDefault: true
})

const initDB = async () => {
  const usersExist = await knex.schema.hasTable('users')
  if (!usersExist) {
    await knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('email')
      table.string('passwd')
      table.string('role')
    })
  }


  const deliveriesExist = await knex.schema.hasTable('deliveries')
  if (!deliveriesExist) {
    await knex.schema.createTable('deliveries', table => {
      table.increments('id').primary()
      table.integer('user_id')
      table.string('name_client')
      table.string('starting_point')
      table.string('destination_point')
      table.timestamp('date')
      
    })
  }
  const totalUsers = await knex('users').select(knex.raw('count(*) as total'))
  if (totalUsers[0].total === 0) {
    await knex.insert({
      name: 'Regis Ribeiro',
      email: 'regisgomesr@gmail.com',
      passwd: 'abc123',
      role: 'user'
    }).into('users')
    await knex.insert({
      name: 'Zé da Silva',
      email: 'ze@dominio.com',
      passwd: 'abc123',
      role: 'user',
    }).into('users')
  }
}
initDB()

module.exports = knex
