import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publisher from 'App/Models/Publisher'
import Book from 'App/Models/Book'
import CreatePublisherValidator from 'App/Validators/CreatePublisherValidator'

export default class PublisherController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePublisherValidator)
    const publisher = await Publisher.create(payload)
    return response.created(publisher)
  }

  public async all({ response }: HttpContextContract) {
    const publishers = await Publisher.all()
    return response.ok(publishers)
  }

  public async update({ request, params, response }: HttpContextContract) {
    const payload = await request.validate(CreatePublisherValidator)
    const publisher = await Publisher.find(params.id)
    if (!publisher) {
      return response.badRequest('Publisher not found')
    }
    await publisher.merge(payload)
    await publisher.save()
    return response.ok(publisher)
  }

  public async delete({ params, response }: HttpContextContract) {
    const publisher = await Publisher.findOrFail(params.id)
    await publisher.delete()
    return response.ok(publisher)
  }

  // public async attachBook({ params, request, response }: HttpContextContract) {
  //   const publisher = await Publisher.findOrFail(params.publisherId)
  //   const {name} = await
  // }
}
