import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Favourite extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public favouritableId: string

  @column()
  public favouriteableType: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignId(favourite: Favourite) {
    favourite.id = uuidv4()
  }
}
