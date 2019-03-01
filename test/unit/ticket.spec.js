"use strict";

const Ticket = use("App/Models/Ticket");
const Factory = use("Factory");
const { test, trait } = use("Test/Suite")("Ticket");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("Get All Tickets", async ({ client }) => {
  await Factory.model("App/Models/Ticket").create();

  const response = await client.get("/api/v1/tickets").end();

  response.assertStatus(200);
  response.assertJSONSubset({
    total: 1,
    perPage: 10,
    page: 1,
    lastPage: 1,
    data: []
  });
});
