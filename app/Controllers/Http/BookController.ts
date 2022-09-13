import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateBookValidator from 'App/Validators/CreateBookValidator'
import Book from 'App/Models/Book'
import Category from 'App/Models/Category'
import Author from 'App/Models/Author'

export default class BookController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateBookValidator)
    const book = await Book.create(payload)
    response.status(201).json({ book })
  }

  public async addCategory({ params, request, response }: HttpContextContract) {
    const book = await Book.findOrFail(params.bookId)
    const category = await Category.findByOrFail('name', request.body().name)
    await book.related('categories').attach([category.id])
    await book.load('categories')
    return response.status(200).json({ book })
  }

  public async addAuthor({ params, request, response }: HttpContextContract) {
    const book = await Book.findOrFail(params.bookId)
    const author = await Author.findByOrFail('name', request.body().name)
    await book.related('authors').attach([author.id])
    await book.load('authors')
    return response.status(200).json({ book })
  }
}
