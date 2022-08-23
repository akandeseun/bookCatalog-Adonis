import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
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

  @column()
  public publisherId: string

  @column()
  public categoryId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static createBookId(book: Book) {
    book.id = uuidv4()
  }
}
