import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import User from 'App/Models/User'

export default class VerifyUser {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      // const user = await auth.use('api').user
      // if (!user) {
      //   return response.unauthorized('Unauthorized User')
      // }
      await auth.use('api').authenticate()
      // console.log(auth.use('api').user!)
      // const checkUser = await User.find(user.id)
      // if (!checkUser) {
      //   return response.forbidden('You are not allowed to access this page')
      // }
      // return
    } catch (error) {
      return response.internalServerError({
        error: error.message,
      })
    }
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
