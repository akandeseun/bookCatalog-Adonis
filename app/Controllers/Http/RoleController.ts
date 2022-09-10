import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RoleController {
  public async create({ request, response }: HttpContextContract) {
    const role = await Role.create(request.body())
    return response.created(role)
  }
}
