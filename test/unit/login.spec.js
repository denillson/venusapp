"use strict";

const { test, trait } = use("Test/Suite")("Login");
const User = use("App/Models/User");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("Login User", async ({ client }) => {
  const payload = {
    username: "example",
    email: "example@example.com",
    password: "testing"
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

test("Username is Null", async ({ client }) => {
  const payload = {
    username: null,
    email: "example@example.com",
    password: "testing"
  };

  var response = await client
    .post("/api/v1/login")
    .header("accept", "application/json")
    .send(payload)
    .end();

  response.assertStatus(400);
  response.assertError([
    {
      message: "o campo username é obrigatório.",
      field: "username",
      validation: "required"
    }
  ]);
});

test("Email is Null", async ({ client }) => {
  const payload = {
    username: "example",
    email: null,
    password: "testing"
  };

  var response = await client
    .post("/api/v1/login")
    .header("accept", "application/json")
    .send(payload)
    .end();

  response.assertStatus(400);
  response.assertError([
    {
      message: "o campo e-mail é obrigatório.",
      field: "email",
      validation: "required"
    }
  ]);
});

test("Password is Null", async ({ client }) => {
  const payload = {
    username: "example",
    email: "example@example.com",
    password: null
  };

  var response = await client
    .post("/api/v1/login")
    .header("accept", "application/json")
    .send(payload)
    .end();

  response.assertStatus(400);
  response.assertError([
    {
      message: "o campo password é obrigatório.",
      field: "password",
      validation: "required"
    }
  ]);
});
