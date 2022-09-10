import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import { v4 as uuidv4 } from 'uuid'

export default class Author extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public author: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignId(author: Author) {
    author.id = uuidv4()
  }

  @manyToMany(() => Category, {
    pivotTable: 'categorizables',
    pivotTimestamps: true,
  })
  public category: ManyToMany<typeof Category>
}
