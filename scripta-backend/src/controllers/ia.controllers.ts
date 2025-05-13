import type { Request, Response } from "express";
import { IaModel } from "../models/ia.model";

export interface Message {
	role: string;
	content: string;
}

export async function consultModel(req: Request, res: Response) {
	const { tone, verbosity, text } = req.body;
	const iaModel = new IaModel();

	// const data = await iaModel.chatCompletion(messages)

	const messages: Message[] = [
		{
			role: "system",
			content: `Actúa como un corrector avanzado de redacción impulsado por inteligencia artificial. Vas a recibir un *texto* que puede ser una frase, un párrafo o varios. 

				Tu tarea es analizar exhaustivamente el texto con base en el tono proporcionado = **${tone}** y detectar errores de los siguientes tipos:
				- Ortografía
				- Gramática
				- Coherencia
				- Cohesión
				- Redundancia
				- Signos de puntuación
				- Uso incorrecto del lenguaje según el tono

				Tu análisis debe adaptarse al nivel de verbosidad = **${verbosity}**, donde:
				- **Baja**: explicaciones breves
				- **Media**: explicaciones moderadas
				- **Alta**: explicaciones detalladas y profundas

				Devuelve **exclusivamente** un objeto JSON en texto plano, no markdown, con la siguiente estructura:

				{
					"output": {
						"errors": [
							{
								"data": "",
								"category": "",
								"question": "",
								"explanation": "",
								"position": [x, y]
							}
						]
					}
				}

				Detalles de cada campo:

				"data": palabra, signo o fragmento exacto con el error.

				"category": tipo de error (ortográfico, gramatical, redundancia, etc.).

				"question": una pregunta opcional para hacer reflexionar o cuestionar al usuario sobre su redacción. Si no se considera necesaria, será una cadena vacía "".

				"explanation": explicación clara del error, su causa y cómo puede corregirse, ajustada al nivel de verbosidad indicado.

				"position": índice de inicio y fin del error dentro del texto recibido, medido en número de caracteres. Cada error debe tener un rango único y no debe haber solapamientos.

				No incluyas ninguna explicación fuera del JSON. Tu objetivo es ayudar al usuario a mejorar su redacción mediante un análisis claro, técnico y reflexivo, según el tono y nivel indicados.
			`,
		},
		{
			role: "user",
			content: text,
		},
	];

	const data = await iaModel.chatIACompletion(messages);
	console.log(data.choices[0].message.content)
	res.json(data.choices[0].message.content);
}

export async function kadolia(req: Request, res: Response) {
	const { messages } = req.body
	const iaModel = new IaModel()
  
	const data = await iaModel.chatCompletion(messages)
	res.json({ data })
  }