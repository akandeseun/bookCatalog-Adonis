import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateBookValidator from 'App/Validators/CreateBookValidator'
import UpdateBookValidator from 'App/Validators/UpdateBookValidator'
import Book from 'App/Models/Book'
import Category from 'App/Models/Category'
import Author from 'App/Models/Author'

export default class BookController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateBookValidator)
    const book = await Book.create(payload)
    response.status(201).json({ book })
  }

  public async all({ response }: HttpContextContract) {
    const book = await Book.all()
    return response.status(200).json({ book })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateBookValidator)
    const book = await Book.findOrFail(params.bookId)
    await book.merge(payload).save()
    return response.status(200).json({ book })
  }

  public async delete({ params, response }: HttpContextContract) {
    const book = await Book.findOrFail(params.bookId)
    await book.delete()
    return response.status(200).json({ book })
  }

  public async findBook({ params, response }: HttpContextContract) {
    const book = await Book.query()
      .whereILike('title', `%${params.searchf}%`)
      .orWhereILike('isbn', params.searchf)
      .orWhereILike('year', `%${params.searchf}%`)
      .orWhereHas('authors', (authorQuery) => {
        authorQuery.whereILike('name', `%${params.searchf}%`)
      })
      .preload('authors')
      .preload('categories')

    if (book.length === 0) {
      return response.status(422).json({ msg: 'Book not found' })
    }

    return response.status(200).json({ book })
  }

  public async attachCategory({ params, request, response }: HttpContextContract) {
    const book = await Book.findOrFail(params.bookId)
    const category = await Category.findByOrFail('name', request.body().name)
    await book.related('categories').attach([category.id])
    await book.load('categories')
    return response.status(200).json({ book })
  }

  public async removeCategory({ params, request, response }: HttpContextContract) {
    const book = await Book.findOrFail(params.authorId)
    const category = await Category.findByOrFail('name', request.body().name)
    await book.related('categories').detach([category.id])
    await book.load('categories')
    return response.status(200).json({
      msg: 'Category removed',
      book,
    })
  }

  public async addAuthor({ params, request, response }: HttpContextContract) {
    const book = await Book.findOrFail(params.bookId)
    const author = await Author.findByOrFail('name', request.body().name)
    await book.related('authors').attach([author.id])
    await book.load('authors')
    return response.status(200).json({ book })
  }

  // to re adjust
  public async findByCategory({ response }: HttpContextContract) {
    const book = await Book.query().whereHas('categories', (categoryQuery) => {
      categoryQuery.where('name', 'comedy')
    })
    return response.json(book)
  }

  public async findByAuthor({ response }: HttpContextContract) {
    const book = await Book.query().whereHas('authors', (authorQuery) => {
      authorQuery.where('name', 'martin')
    })
    return response.status(200).json({ book })
  }
}
