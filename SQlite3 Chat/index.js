const {options} = require ('./DB/sqlite.db')
const knex = require('knex')(options);

knex.schema.createTable('chat', function (table) {
    table.increments('id')
    table.string('author')
    table.string('date')
    table.string('text')
  })
    .then(()=> console.log('table created'))
    .catch((err)=> console.log(err))
    .finally(() => {
      knex.destroy();
    });

