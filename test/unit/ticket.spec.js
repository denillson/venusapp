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

test("Get Ticket", async ({ client }) => {
  const ticket = await Factory.model("App/Models/Ticket").create();

  const response = await client.get(`/api/v1/tickets/${ticket.id}`).end();

  response.assertStatus(200);
  response.assertJSONSubset({ priority: "critical" });
});

test("Create a new Ticket", async ({ client }) => {
  const user = await Factory.model("App/Models/User").create();
  const ticket = await Factory.model("App/Models/Ticket").make();

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

test("Update Ticket", async ({ client }) => {
  const ticket = await Factory.model("App/Models/Ticket").create();
  const user = await Factory.model("App/Models/User").create();
  const ticketUpdated = {
    title: "Hello 2",
    content: "Hello 2 content...",
    status: true,
    priority: "low"
  };

  const response = await client
    .put(`/api/v1/tickets/${ticket.id}`)
    .header("Accept", "application/json")
    .loginVia(user, "jwt")
    .send(ticketUpdated)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset(ticketUpdated);
});

test("Remove Ticket", async ({ client }) => {
  const ticket = await Factory.model("App/Models/Ticket").create();
  const user = await Factory.model("App/Models/User").create();

  const response = await client
    .delete(`/api/v1/tickets/${ticket.id}`)
    .header("Accept", "application/json")
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({ priority: "critical" });
});
