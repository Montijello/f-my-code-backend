exports.seed = function(knex, Promise) {
      return knex("ratings")
        .insert([
          {
            id: 1,
            rating: 1,
            user_id: 1,
            post_id: 1
          },
          {
            id: 2,
            rating: 1,
            user_id: 2,
            post_id: 1
          },
          {
            id: 3,
            rating: -1,
            user_id: 3,
            post_id: 2

          }
        ])
        .then(()=> {
          return knex.raw(`SELECT setval('ratings_id_seq', (SELECT MAX(id) FROM ratings))`)
        })
      }
