import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import createUserValidator from 'App/Validators/CreateUserValidator'
import UserSignInValidator from 'App/Validators/UserSignInValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public async createUser({ request, response }: HttpContextContract) {
    // validate user input using custom validator
    const payload = await request.validate(createUserValidator)

    const user = await User.create(payload)
    return response.status(201).json({ user })
  }

  public async authenticateUser({ request, response }: HttpContextContract) {
    const payload = await request.validate(UserSignInValidator)

    const user = await User.findBy('email', payload.email)
    if (!user) {
      return response.status(400).json({
        msg: 'Incorrect email or password',
      })
    }
    if (!(await Hash.verify(user.password, payload.password))) {
      return response.status(400).json({
        msg: 'Incorrect email or password',
      })
    }
    return response.status(200).json({
      msg: `welcome ${user.username}`,
    })
  }
}
