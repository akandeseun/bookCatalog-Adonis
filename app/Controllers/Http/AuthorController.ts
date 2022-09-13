import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author from 'App/Models/Author'
import Category from 'App/Models/Category'

export default class AuthorController {
  public async addCategory({ params, request, response }: HttpContextContract) {
    const author = await Author.findOrFail(params.authorId)
    const category = await Category.findByOrFail('name', request.body().name)
    await author.related('categories').attach([category.id])
    await author.load('categories')
    return response.status(200).json({ author })
  }
}
