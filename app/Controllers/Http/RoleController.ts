import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
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
    const role = await Role.findOrFail(params.id)
    role.merge(payload)
    await role.save()
    return response.ok(role)
  }
  // To adjust
  public async all({ response }: HttpContextContract) {
    const role = await Role.all()
    return response.ok(role)
    // const user = await auth.user?.preload('roles')
    // return response.json(user)
  }

  public async delete({ params, response }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    await role.delete()
    return response.status(200).json({ msg: 'role deleted' })
  }

  // Attach permission to role
  public async attachPermission({ params, request, response }: HttpContextContract) {
    const role = await Role.findOrFail(params.RoleId)
    const { name } = await request.body()
    const permission = await Permission.findByOrFail('name', name)
    await role.related('permissions').attach([permission.id])
    await role.load('permissions')
    return response.status(200).json({ role })
  }
}
