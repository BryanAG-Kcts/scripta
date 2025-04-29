import { client } from '../services/ia.services'

export class IaModel {
  static iaClient = client
  static defaultConfig = {
    provider: 'novita',
    model: 'deepseek-ai/DeepSeek-V3-0324'
  }

  async chatCompletion(messages: []) {
    return await IaModel.iaClient.chatCompletion({
      ...IaModel.defaultConfig,
      messages
    })
  }
}
