import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoryController {
  public async create({ request, response }: HttpContextContract) {
    const categoryName = request.body()
    const cat = await Category.create(categoryName)
    return response.status(201).json({ cat })
  }
}
