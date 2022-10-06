import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Category from './Category'
import Author from './Author'
import Language from './Language'
import Publisher from './Publisher'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public year: number

  @column()
  public isbn: string

  @column()
  public series: string

  @column()
  public volume: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships

  // Book <--> Category
  @manyToMany(() => Category, {
    pivotTable: 'books_categories',
    pivotTimestamps: true,
  })
  public categories: ManyToMany<typeof Category>

  // Book <--> Author
  @manyToMany(() => Author, {
    pivotTable: 'book_authors',
    pivotTimestamps: true,
  })
  public authors: ManyToMany<typeof Author>

  // Book <--> Language
  @manyToMany(() => Language, {
    pivotTable: 'book_languages',
    pivotTimestamps: true,
  })
  public languages: ManyToMany<typeof Language>

  // Book <--> Publisher
  @manyToMany(() => Publisher, {
    pivotTable: 'book_publishers',
    pivotTimestamps: true,
  })
  public publishers: ManyToMany<typeof Publisher>

  // Hooks
  @beforeCreate()
  public static assignId(book: Book) {
    book.id = uuidv4()
  }
}
