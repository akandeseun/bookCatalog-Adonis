import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Book from './Book'
import User from './User'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships
  @manyToMany(() => Book, {
    pivotTable: 'books_categories',
    pivotTimestamps: true,
  })
  public books: ManyToMany<typeof Book>

  @manyToMany(() => User, {
    pivotTable: 'books_categories',
    pivotTimestamps: true,
  })
  public users: ManyToMany<typeof User>

  // Hooks
  @beforeCreate()
  public static assignId(category: Category) {
    category.id = uuidv4()
  }
}
