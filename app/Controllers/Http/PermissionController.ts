import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePermissionValidator from 'App/Validators/CreatePermissionValidator'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'

export default class PermissionController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePermissionValidator)
    const permission = await Permission.create(payload)
    return response.created(permission)
  }

  public async all({ response }: HttpContextContract) {
    const permission = await Permission.all()
    return response.ok(permission)
  }

  public async update({ request, params, response }: HttpContextContract) {
    const payload = await request.validate(CreatePermissionValidator)
    const permission = await Permission.findOrFail(params.id)
    await permission.merge(payload)
    await permission.save()
    return response.ok(permission)
  }

  public async delete({ params, response }: HttpContextContract) {
    const permission = await Permission.findOrFail(params.id)
    await permission.delete()
    return response.ok('deleted')
  }

  // public async attachRole({ params, request, response }: HttpContextContract) {
  //   const permission = await Permission.findOrFail(params.id)
  //   const { name } = await request.body()
  //   const role = await Role.findByOrFail('name', name)
  //   await permission.related('roles').attach([role.id])
  //   await permission.load('roles')
  //   return response.status(200).json({ permission })
  // }
}
