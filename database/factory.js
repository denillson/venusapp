"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/User", faker => {
  return {
    username: faker.username(),
    email: faker.email({ domain: "statusok.com.br" }),
    password: "secret"
  };
});

Factory.blueprint("App/Models/Ticket", faker => {
  return {
    title: faker.sentence({ words: 3 }),
    content: faker.paragraph({ sentences: 1 }),
    status: faker.bool(),
    priority: "critical",
    user_id: async () => {
      return (await Factory.model("App/Models/User").create()).id;
    }
  };
});
