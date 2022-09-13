import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  // Relationships
  @manyToMany(() => User, {
    pivotTable: 'user_roles',
    pivotTimestamps: true,
  })
  public users: ManyToMany<typeof User>

  // Hooks
  @beforeCreate()
  public static assignId(role: Role) {
    role.id = uuidv4()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
