
exports.up = function(knex, Promise) {
  table.integer('user_id').notNullable
  table.foreign('user_id').references('users.id').onDelete('cascade')

  table.integer('post_id').notNullable
  table.foreign('post_id').references('')
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("ratings_users");
};