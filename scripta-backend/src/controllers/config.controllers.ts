import type { Request, Response } from 'express'
import { ConfigModel } from "../models/config.model";

type DataItem = {
  idSetting: number
  state: boolean;
  tone: string;
  stateDictionary: boolean;
  verbosity: string;
  domain: string;
  word: string;
};

export const getConfig = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id)
  const input = (await new ConfigModel().consultConfig(id)) as DataItem[];
  
  const { idSetting, state, tone, stateDictionary, verbosity } = input[0];

  const pages: string[] = Array.from(
    new Set(input.map((item) => item.domain).filter((item) => !!item))
  );

  const dictionary: string[] = Array.from(
    new Set(input.map((item: DataItem) => item.word).filter((item) => !!item))
  );

  const data = {
    idSetting,
    config: {
      state,
      tone,
      stateDictionary,
      verbosity,
    },
    pages,
    dictionary,
  };

  res.json({
    data,
  });
};

export const putConfig = async (req: Request, res: Response) => {

    const {settingId : id_setting, state, tone, verbosity, stateDictionary} = req.body
    try{
        const config = await new ConfigModel().updateConfig(id_setting, state, tone, verbosity, stateDictionary);
        if(!config) {
            res.status(404).json({
                success : false,
                message : 'No se han podido actualizar la configuración'
            }) 
            return
        }

        res.status(200).json({
            success : true,
            message : "Configuración actualizada"
        })

    }catch(error){
        console.error('Update error:', error)
        res
          .status(500)
          .json({ success: false, message: 'Error interno del servidor' })
    }
}

export const putPages = async (req: Request, res: Response) => {

  const {settingId, arrayDomains} = req.body
  try {
    const response = await new ConfigModel().postPages(settingId, arrayDomains)
    if(!response){
      res.status(404).json({
        success: false,
        message: 'No se ha podido actualizar los dominios'
      })
    }
  
    res.status(200).json({
      success: true,
      msg : "Los dominios han sido actualizados con exito"
    })

  } catch (error) {
    console.error('Register error:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}


export const putDictionary = async (req: Request, res: Response) => {
  const {settingId, dictionary} = req.body

  try {
    const response = await new ConfigModel().postDictionary(settingId, dictionary)
    if(!response){
      res.status(404).json({
        success: false,
        message: 'No se ha podido actualizar los dominios'
      })
    }
  
    res.status(200).json({
      success: true,
      msg : "El diccionario ha sido actualizado con exito"
    })

  } catch (error) {
    console.error('Register error:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}
