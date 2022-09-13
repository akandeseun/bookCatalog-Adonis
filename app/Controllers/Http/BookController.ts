import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateBookValidator from 'App/Validators/CreateBookValidator'
import Book from 'App/Models/Book'
import Category from 'App/Models/Category'

export default class BookController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateBookValidator)
    const book = await Book.create(payload)
    response.created(book)
  }

  public async addCategory({ params, request, response }: HttpContextContract) {
    const book = await Book.findOrFail(params.catId)
    const category = await Category.findByOrFail('name', request.body().name)
    await book.related('categories').attach([category.id])
    await book.load('categories')
    return response.ok(book)
  }
}
