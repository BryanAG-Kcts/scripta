import type { Request, Response } from 'express'
import { ConfigModel } from "../models/config.model";

type DataItem = {
  state: boolean;
  tone: string;
  stateDictionary: boolean;
  verbosity: string;
  domain: string;
  word: string;
};

export const config = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id)
  const input = (await new ConfigModel().consultConfig(id)) as DataItem[];
  
  const { state, tone, stateDictionary, verbosity } = input[0];

  const pages: string[] = Array.from(
    new Set(input.map((item) => item.domain).filter((item) => !!item))
  );

  const dictionary: string[] = Array.from(
    new Set(input.map((item: DataItem) => item.word).filter((item) => !!item))
  );

  const data = {
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

    const {id_setting, state, tone, verbosity, stateDictionary} = req.body
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
