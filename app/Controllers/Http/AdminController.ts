import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import createUserValidator from 'App/Validators/CreateUserValidator'
import Admin from 'App/Models/Admin'

export default class AdminController {
  public async createUser({ auth, request, response }: HttpContextContract) {
    // validate user input using custom validator
    const payload = await request.validate(createUserValidator)

    const admin = await Admin.create(payload)
    // const token = await auth.use('api').generate(admin)
    // return response.status(201).json({ admin, token })
  }
}
