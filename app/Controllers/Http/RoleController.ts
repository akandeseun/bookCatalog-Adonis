import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import CreateRoleValidator from 'App/Validators/CreateRoleValidator'

export default class RoleController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateRoleValidator)
    const role = await Role.create(payload)
    return response.created(role)
  }
}
