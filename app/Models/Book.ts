import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import { v4 as uuidv4 } from 'uuid'

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

  @column()
  public language: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Category, {
    pivotTable: 'books_categories',
    pivotTimestamps: true,
  })
  public categories: ManyToMany<typeof Category>

  @beforeCreate()
  public static assignId(book: Book) {
    book.id = uuidv4()
  }
}
