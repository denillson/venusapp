"use strict";

const { test, trait } = use("Test/Suite")("Login");
const User = use("App/Models/User");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("Authentication => Login", async ({ client }) => {
  const payload = {
    username: "spiderman",
    email: "spiderman@marvel.com",
    password: "spider123"
  };

  await User.create({ ...payload });

  const response = await client
    .post("/api/v1/login")
    .send(payload)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    refreshToken: null,
    type: "bearer"
  });
});
