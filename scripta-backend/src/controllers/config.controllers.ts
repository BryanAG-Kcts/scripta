import type { Request, Response } from 'express'
import { ConfigModel } from "../models/config.model";

export const config = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const input = await new ConfigModel().consultConfig(id);

  type DataItem = {
    state: boolean;
    tone: string;
    state_dictionarie: boolean;
    verbosity: string;
    domain: string;
    word: string;
  };

  const { state, tone, state_dictionarie, verbosity } = input[0];

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
      state_dictionarie,
      verbosity,
    },
    pages,
    dictionaries,
  };

  res.json({
    data,
  });
};
