import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Book from './Book'
import User from './User'
import Author from './Author'

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

  // Book <--> Category
  @manyToMany(() => Book, {
    pivotTable: 'books_categories',
    pivotTimestamps: true,
  })
  public books: ManyToMany<typeof Book>

  // User <--> Category
  @manyToMany(() => User, {
    pivotTable: 'users_categories',
    pivotTimestamps: true,
  })
  public users: ManyToMany<typeof User>

  // Category <--> Author
  @manyToMany(() => Author, {
    pivotTable: 'author_categories',
    pivotTimestamps: true,
  })
  public authors: ManyToMany<typeof Author>

  // Hooks
  @beforeCreate()
  public static assignId(category: Category) {
    category.id = uuidv4()
  }
}
