import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'
import Role from './Role'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public routes: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships

  // // Permission <--> User
  @manyToMany(() => User, {
    pivotTable: 'user_permissions',
    pivotTimestamps: true,
  })
  public users: ManyToMany<typeof User>

  // // User <--> Permissions
  @manyToMany(() => Role, {
    pivotTable: 'role_permissions',
    pivotTimestamps: true,
  })
  public roles: ManyToMany<typeof Role>

  // Hooks
  @beforeCreate()
  public static assignId(permission: Permission) {
    permission.id = uuidv4()
  }
}
