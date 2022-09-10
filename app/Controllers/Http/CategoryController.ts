import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'

export default class CategoryController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateCategoryValidator)
    const category = await Category.create(payload)
    return response.status(201).json({ category })
  }
}
