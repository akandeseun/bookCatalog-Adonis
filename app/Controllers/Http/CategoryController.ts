import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'

export default class CategoryController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateCategoryValidator)
    const category = await Category.create(payload)
    return response.created(category)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(CreateCategoryValidator)
    const category = await Category.find(params.id)
    if (!category) {
      return response.badRequest('category not found')
    }
    category.merge(payload)
    await category.save()
    return response.ok(category)
  }

  public async delete({ params, response }: HttpContextContract) {
    const category = await Category.find(params.id)
    if (!category) {
      return response.badRequest('category not found')
    }
    await category.delete()
    return response.status(204).json({ msg: 'category deleted' })
  }
}
