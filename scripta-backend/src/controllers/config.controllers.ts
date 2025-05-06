import type { Request, Response } from 'express'
import { ConfigModel } from "../models/config.model";

export const config = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const input = await new ConfigModel().consultConfig(id);

  type DataItem = {
    state: boolean;
    tone: string;
    stateDictionarie: boolean;
    verbosity: string;
    domain: string;
    word: string;
  };

  const { state, tone, stateDictionarie, verbosity } = input[0];

  const pages: string[] = Array.from(
    new Set(input.map((item: DataItem) => item.domain))
  );

  const dictionaries: string[] = Array.from(
    new Set(input.map((item: DataItem) => item.word))
  );

  const data = {
    config: {
      state,
      tone,
      stateDictionarie,
      verbosity,
    },
    pages,
    dictionaries,
  };

  res.json({
    data,
  });
};

export const putConfig = async (req: Request, res: Response) => {

    const {id_setting, state, tone, verbosity, state_dictionarie} = req.body
    try{
        const config = await new ConfigModel().updateConfig(id_setting, state, tone, verbosity, state_dictionarie);
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
