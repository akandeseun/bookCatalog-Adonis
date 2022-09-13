import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import User from 'App/Models/User'
import Category from 'App/Models/Category'
import Role from 'App/Models/Role'

export default class UserController {
  public async addCategory({ auth, request, response }: HttpContextContract) {
    const categoryDetails = request.body()
    const category = await Category.findByOrFail('name', categoryDetails.name)

    const user = await auth.user
    await user?.related('categories').attach([category.id])
    await user?.load('categories')
    return response.status(200).json(user)
  }

  public async assignRole({ auth, request, response }: HttpContextContract) {
    const role = await Role.findByOrFail('name', request.body().name)
    const user = await auth.user
    await user?.related('roles').attach([role.id])
    await user?.load('roles')
    return response.status(200).json(user)
  }
}
