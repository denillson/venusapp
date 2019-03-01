"use strict";

const Ticket = use("App/Models/Ticket");
const User = use("App/Models/User");
const Factory = use("Factory");
const { test, trait } = use("Test/Suite")("Ticket");

trait("Test/ApiClient");
trait("DatabaseTransactions");
trait("Auth/Client");

test("Get All Tickets", async ({ client }) => {
  await Factory.model("App/Models/Ticket").create();

  const response = await client.get("/api/v1/tickets").end();

  response.assertStatus(200);
  response.assertJSONSubset({
    perPage: 10,
    page: 1,
    lastPage: 1,
    data: []
  });
});

test("Create a new Ticket", async ({ client }) => {
  const user = await Factory.model("App/Models/User").create();
  const ticket = await Factory.model("App/Models/Ticket").make({ user_id: 3 });

  const response = await client
    .post("/api/v1/tickets")
    .header("Accept", "application/json")
    .loginVia(user, "jwt")
    .send(ticket.$attributes)
    .end();

  // remove user_id field
  delete ticket.$attributes.user_id;

  response.assertStatus(201);
  response.assertJSONSubset(ticket.$attributes);
});
