import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Category from 'App/Models/Category'
import Role from 'App/Models/Role'
import Permission from 'App/Models/Permission'

export default class UserController {
  public async addCategory({ auth, request, response }: HttpContextContract) {
    const categoryDetails = request.body()
    const category = await Category.findByOrFail('name', categoryDetails.name)

    const user = await auth.user
    await user?.related('categories').attach([category.id])
    await user?.load('categories')
    return response.status(200).json(user)
  }

  public async assignRole({ request, response, params }: HttpContextContract) {
    const role = await Role.findByOrFail('name', request.body().name)
    const user = await User.findOrFail(params.userId)
    await user?.related('roles').attach([role.id])
    await user?.load('roles')
    return response.status(200).json(user)
  }

  public async attachPermission({ params, request, response }: HttpContextContract) {
    const user = await User.findOrFail(params.userId)
    const permission = await Permission.findByOrFail('name', request.body().name)
    await user?.related('permissions').attach([permission.id])
    await user?.load('permissions')
    return response.status(200).json(user)
  }
}
