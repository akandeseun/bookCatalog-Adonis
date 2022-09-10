import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'

export default class VerifyAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const user = await auth.use('api').user
      if (!user) {
        return response.forbidden('Unauthorized User')
      }
      const checkAdmin = await Admin.find(user.id)
      if (!checkAdmin) {
        return response.unauthorized('You are not allowed to access this page')
      }
    } catch (error) {
      return response.internalServerError({
        error: error.message,
      })
    }
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
