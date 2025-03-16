import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';

export const referees = pgTable('referees', {
  id: integer('id').unique().primaryKey(),
  email: text('email').notNull(),
});

export const matchCommissioners = pgTable('match_commissioners', {
  id: integer('id').unique().primaryKey(),
  email: text('email').notNull(),
  phoneNumber: text('phone_number').notNull(),
  isCometSupport: boolean('is_comet_support').default(false),
});

export const contactRoles = pgTable('contact_roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phone_number').notNull(),
  teamId: integer('team_id').notNull(),
  contactRoleId: integer('contact_role_id')
    .references(() => contactRoles.id, {
      onDelete: 'cascade',
    })
    .notNull(),
});
