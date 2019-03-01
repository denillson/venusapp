"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TicketSchema extends Schema {
  up() {
    this.create("tickets", table => {
      table.increments();
      table
        .string("title", 80)
        .notNullble()
        .unique();
      table.text("content").notNullable();
      table
        .boolean("status")
        .defaultTo(true)
        .notNullable();
      table
        .enu("priority", ["low", "medium", "high", "critical"])
        .defaultTo("low");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table.timestamps();
    });
  }

  down() {
    this.drop("tickets");
  }
}

module.exports = TicketSchema;
