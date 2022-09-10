import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateRoleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.unique({ table: 'roles', column: 'name' })]),
    description: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    'required': '{{ field }} is required to create a new role',
    'rules.unique': 'Role already exists',
  }
}
