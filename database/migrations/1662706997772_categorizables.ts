import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { v4 as uuidv4 } from 'uuid'

export default class extends BaseSchema {
  protected tableName = 'categorizables'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(uuidv4())
      table.uuid('category_id').references('categories.id')
      table.uuid('book_id').references('books.id').nullable()
      table.uuid('author_id').references('authors.id').nullable()
      table.unique(['category_id', 'book_id', 'author_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}