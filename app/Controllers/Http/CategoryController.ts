import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'
import Category from 'App/Models/Category'
// import User from 'App/Models/User'

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

  public async all({ response }: HttpContextContract) {
    const categories = await Category.all()
    return response.ok(categories)
  }

  public async delete({ params, response }: HttpContextContract) {
    const category = await Category.find(params.id)
    if (!category) {
      return response.status(400).json({ msg: 'category not found' })
    }
    await category.delete()
    return response.status(200).json({ msg: 'category deleted' })
  }

  // public async addUserCategory({ auth, response }: HttpContextContract) {
  //   return response.json(await auth.user)
  // }

  public async addCategory({ auth, request, response }: HttpContextContract) {
    const categoryDetails = await request.body()
    const category = await Category.findByOrFail('name', categoryDetails.name)

    const user = await auth.user
    await user?.related('categories').attach([category.id])
    await user?.load('categories')
    return response.json(user)
  }
}
