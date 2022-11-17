import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateLanguageValidator from 'App/Validators/CreateLanguageValidator'
import Language from 'App/Models/Language'

export default class LanguageController {
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateLanguageValidator)
    const language = await Language.create(payload)
    return response.created(language)
  }

  public async all({ response }: HttpContextContract) {
    const languages = await Language.all()
    return response.ok(languages)
  }

  public async update({ request, params, response }: HttpContextContract) {
    const payload = await request.validate(CreateLanguageValidator)
    const language = await Language.find(params.id)
    if (!language) {
      return response.badRequest('Language not found')
    }
    await language.merge(payload)
    await language.save()
    return response.ok(language)
  }

  public async delete({ params, response }: HttpContextContract) {
    const language = await Language.findOrFail(params.id)
    await language.delete()
    return response.ok(language)
  }
}
