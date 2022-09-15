import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateAuthorValidator from 'App/Validators/CreateAuthorValidator'
import Author from 'App/Models/Author'
import Category from 'App/Models/Category'

export default class AuthorController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateAuthorValidator)
    const author = await Author.create(payload)
    return response.status(201).json({ author })
  }

  public async all({ response }: HttpContextContract) {
    const authors = await Author.all()
    return response.status(200).json({ authors })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(CreateAuthorValidator)
    const author = await Author.findOrFail(params.id)
    author.merge(payload)
    await author.save()
    return response.status(200).json({ author })
  }

  public async delete({ params, response }: HttpContextContract) {
    const author = await Author.findOrFail(params.id)
    await author.delete()
    return response.status(200).json({ msg: 'author deleted' })
  }

  // To work on adding duplicate categories
  public async addCategory({ params, request, response }: HttpContextContract) {
    const author = await Author.findOrFail(params.authorId)
    const category = await Category.findByOrFail('name', request.body().name)
    await author.related('categories').attach([category.id])
    await author.load('categories')
    return response.status(200).json({ author })
  }
}
