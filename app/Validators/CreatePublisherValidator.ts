import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePublisherValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.unique({ table: 'publishers', column: 'name' })]),
  })

  public messages: CustomMessages = {
    'required': '{{ field }} is required to create/update a new category',
    'name.unique': 'Publisher already exists',
  }
}
