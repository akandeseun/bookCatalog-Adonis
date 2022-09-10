import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.unique({ table: 'categories', column: 'name' })]),
  })

  public messages: CustomMessages = {
    'required': '{{ field }} is required to create a new category',
    'rules.unique': 'Category already exists',
  }
}
