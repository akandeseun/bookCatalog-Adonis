import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import createUserValidator from 'App/Validators/CreateUserValidator'
import UserSignInValidator from 'App/Validators/UserSignInValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public async createUser({ auth, request, response }: HttpContextContract) {
    // validate user input using custom validator
    const payload = await request.validate(createUserValidator)

    const user = await User.create(payload)
    const token = await auth.use('api').generate(user)
    return response.status(201).json({ user, token })
  }

  public async authenticateUser({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(UserSignInValidator)
    // try {
    //   const token = await auth.use('api').attempt(payload.email, payload.password)
    //   return token
    // } catch (error) {
    //   return response.unauthorized('Invalid credentials')
    // }

    try {
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
      const token = await auth.use('api').generate(user, { expiresIn: '30 days' })
      const current = auth.use('api').user
      return response.status(200).json({
        msg: `welcome ${user.username}`,
        token,
        current,
      })
    } catch (error) {
      return response.unauthorized('invalid credentials')
    }
  }
}
