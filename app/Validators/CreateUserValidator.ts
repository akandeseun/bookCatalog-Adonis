import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username' })]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string([rules.minLength(6)]),
  })

  public messages: CustomMessages = {
    'required': '{{ field }} is required to create a new account',
    'email.unique': 'User exists with email',
    'username.unique': 'username taken',
    'minLength': '{{ field }} cannot be less than six(6) characters',
  }
}
