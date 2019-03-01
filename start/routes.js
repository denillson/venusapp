"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("/api/v1/register", "AuthController.register").validator("Register");
Route.post("/api/v1/login", "AuthController.login").validator("Login");

Route.group(() => {
  Route.resource("tickets", "TicketController")
    .middleware(new Map([[["store", "update", "destroy"], ["auth"]]]))
    .apiOnly()
    .except(["create", "edit"])
    .validator(
      new Map([
        [["tickets.store"], ["ticket"]],
        [["tickets.update"], ["ticket"]]
      ])
    );
}).prefix("/api/v1");
