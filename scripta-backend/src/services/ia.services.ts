import { InferenceClient } from '@huggingface/inference'
import { ENVIRONMENT } from '../config/environment'

export const client = new InferenceClient(ENVIRONMENT.iaToken)
