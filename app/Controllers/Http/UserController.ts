import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import User from 'App/Models/User'
import Category from 'App/Models/Category'

export default class UserController {
  public async addCategory({ auth, request, response }: HttpContextContract) {
    const categoryDetails = request.body()
    const category = await Category.findByOrFail('name', categoryDetails.name)

    const user = await auth.user
    await user?.related('categories').attach([category.id])
    await user?.load('categories')
    return response.json(user)
  }
}
