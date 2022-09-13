import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Category from './Category'
import Book from './Book'

export default class Author extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships

  // Book <--> Author
  @manyToMany(() => Book, {
    pivotTable: 'book_authors',
    pivotTimestamps: true,
  })
  public books: ManyToMany<typeof Book>

  // Author <--> Category
  @manyToMany(() => Category, {
    pivotTable: 'author_categories',
    pivotTimestamps: true,
  })
  public categories: ManyToMany<typeof Category>

  // Hooks
  @beforeCreate()
  public static assignId(author: Author) {
    author.id = uuidv4()
  }
}
