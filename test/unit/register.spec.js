"use strict";

const Mail = use("Mail");
const { test, trait } = use("Test/Suite")("Register");
const User = use("App/Models/User");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("Register User", async ({ assert, client }) => {
  Mail.fake();

  const payload = {
    username: "example",
    email: "example@example.com",
    password: "testing1_password"
  };

  const response = await client
    .post("/api/v1/register")
    .header("Accept", "application/json")
    .send(payload)
    .end();

  // test http response...
  delete payload.password;

  response.assertStatus(200);
  response.assertJSONSubset(payload);

  // test email response ...
  const recentEmail = await Mail.pullRecent();

  assert.equal(recentEmail.message.subject, "Seja bem-vindo example");
  assert.equal(
    recentEmail.message.html,
    "<h2> Olá example </h2>\n\n<p> Este é um e-mail de boas vindas!</p>\n\n<p>\n  Agradecemos por você ter feito o cadastrado em nosso sistema, \n  agora você poderá ter acesso a nossa comunidade.\n</p>\n\n<p>\n  <em>Equipe <strong>Venus </strong>,\n  <br />\n  Agradece\n  </em>\n</>\n"
  );
  assert.equal(recentEmail.message.to[0].name, "example");
  assert.equal(recentEmail.message.to[0].address, "example@example.com");
  assert.equal(recentEmail.message.from.name, "Venus");

  Mail.restore();
});

test("Register with invalid e-mail", async ({ client }) => {
  const payload = {
    username: "example",
    email: "example@example",
    password: "testing1_password"
  };

  const response = await client
    .post("/api/v1/register")
    .header("accept", "application/json")
    .send(payload)
    .end();

  response.assertStatus(400);
  response.assertError([
    {
      message: "o e-mail deve ser um campo válido.",
      field: "email",
      validation: "email"
    }
  ]);
});

test("Register already exist e-mail", async ({ client }) => {
  const payload = {
    username: "example",
    email: "example@example.com",
    password: "testing1_password"
  };

  await User.create(payload);

  const response = await client
    .post("/api/v1/register")
    .header("accept", "application/json")
    .send(payload)
    .end();

  response.assertStatus(400);
  response.assertError([
    {
      message: "o campo e-mail deve ser único.",
      field: "email",
      validation: "unique"
    }
  ]);
});

test("Register with email null", async ({ client }) => {
  const payload = {
    username: "example",
    email: null,
    password: "testing1_password"
  };

  var response = await client
    .post("/api/v1/register")
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

test("Register with username null", async ({ client }) => {
  const payload = {
    username: null,
    email: "example@example.com",
    password: "testing1_password"
  };

  var response = await client
    .post("/api/v1/register")
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

test("Register with password null", async ({ client }) => {
  const payload = {
    username: "example",
    email: "example@localhost.com",
    password: null
  };

  var response = await client
    .post("/api/v1/register")
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
