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

  public async findAuthor({ params, response }: HttpContextContract) {
    const author = await Author.query().whereILike('name', `%${params.searchf}%`).preload('books')
    if (author.length === 0) {
      return response.status(422).json({ msg: 'Author not found' })
    }

    return response.status(200).json({ author })
  }

  // STILL NEEDS ADJUSTMENT

  // To work on adding duplicate categories
  public async attachCategory({ params, request, response }: HttpContextContract) {
    const category = await Category.findByOrFail('name', request.body().name)
    const author = await Author.findOrFail(params.authorId)
    await author.load('categories')
    let results = author.categories
    // Checking for and avoiding duplicate categories
    try {
      for (const member of results) {
        if (member.id === category.id) {
          return response.status(400).json({
            msg: 'Category exists on Author',
          })
        }
      }
      await author.related('categories').attach([category.id])
      await author.load('categories')
      return response.status(200).json({ author })
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }

  public async removeCategory({ params, request, response }: HttpContextContract) {
    const author = await Author.findOrFail(params.authorId)
    const category = await Category.findByOrFail('name', request.body().name)
    await author.related('categories').detach([category.id])
    await author.load('categories')
    return response.status(200).json({
      msg: 'Category removed',
      author,
    })
  }

  // to re-adjust
  public async findAuthorByCategory({ response }: HttpContextContract) {
    const author = await Author.query().whereHas('categories', (categoryQuery) => {
      categoryQuery.where('name', 'comedy')
    })
    return response.json({ author })
  }
}
