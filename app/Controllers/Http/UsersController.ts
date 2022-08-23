import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import createUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async createUser({ request, response }: HttpContextContract) {
    // validate user input using custom validator
    const payload = await request.validate(createUserValidator)

    const user = await User.create(payload)
    return response.status(201).json({ user })
  }
}
