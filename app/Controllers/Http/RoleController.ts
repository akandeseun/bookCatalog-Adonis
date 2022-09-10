import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import CreateRoleValidator from 'App/Validators/CreateRoleValidator'

export default class RoleController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateRoleValidator)
    const role = await Role.create(payload)
    return response.created(role)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(CreateRoleValidator)
    const role = await Role.find(params.id)
    if (!role) {
      return response.badRequest('Role not found')
    }
    role.merge(payload)
    await role.save()
    return response.ok(role)
  }

  public async all({ response }: HttpContextContract) {
    const role = await Role.all()
    return response.ok(role)
  }

  public async delete({ params, response }: HttpContextContract) {
    const role = await Role.find(params.id)
    if (!role) {
      return response.badRequest('role not found')
    }
    await role.delete()
    return response.status(200).json({ msg: 'role deleted' })
  }
}
