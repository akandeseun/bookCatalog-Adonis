import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Book from './Book'
export default class Publisher extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships

  // Book <--> Publisher
  @manyToMany(() => Book, {
    pivotTable: 'book_publishers',
    pivotTimestamps: true,
  })
  public books: ManyToMany<typeof Book>

  // Hooks
  @beforeCreate()
  public static assignId(publisher: Publisher) {
    publisher.id = uuidv4()
  }
}
