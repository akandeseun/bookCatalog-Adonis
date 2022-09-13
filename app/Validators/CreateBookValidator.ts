import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateBookValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }),
    year: schema.number.optional(),
    isbn: schema.string.optional({ trim: true }, [
      rules.unique({ table: 'books', column: 'isbn' }),
    ]),
    series: schema.string.optional({ trim: true }),
    volume: schema.number.optional(),
  })

  public messages: CustomMessages = {
    'required': '{{ field }} cannot be empty',
    'isbn.unique': 'Book exists with ISBN',
  }
}
