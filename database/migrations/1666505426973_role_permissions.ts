import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'role_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.uuid('role_id').references('roles.id')
      table.uuid('permission_id').references('permissions.id')

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
