import { IDatabase } from "pg-promise";
import { PgConnection } from "../services/pgConnection.services";

export class ConfigModel {
  private db: IDatabase<unknown>;

  constructor() {
    this.db = PgConnection.getInstance().connection;
  }

  async consultConfig(id_user: number) {
    return await this.db.query(
      `
    select 
        s.state,
        s.tone,
        s.state_dictionarie as "stateDictionarie",
        s.verbosity,
        p.domain,
        d.word
    from settings as s 
    inner join users as u
        on s.users_id = u.id
    inner join pages as p
        on s.id_setting = p.setting_id
    inner join dictionaries as d
        on s.id_setting = d.setting_id
    where u.id = $1
    group by s.state, s.tone, s.state_dictionarie, s.verbosity, p.domain, d.word 
        `,
      [id_user]
    );
  }

  async updateConfig(id_setting : number, state: boolean, tone: string, verbosity: string, state_dictionarie:boolean){
    return await this.db.query(`
        UPDATE SETTINGS
        SET 
            State = $2,
            Tone = $3,
            Verbosity = $4,
            State_dictionarie = $5
        WHERE Id_setting = $1;
    `, [id_setting, state, tone, verbosity, state_dictionarie])

  }
}
