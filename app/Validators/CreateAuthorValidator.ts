import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAuthorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.unique({ table: 'authors', column: 'name' })]),
  })

  public messages: CustomMessages = {
    'required': '{{ field }} is required to create/update a new category',
    'name.unique': 'Author already exists',
  }
}
