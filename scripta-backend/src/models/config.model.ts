import type { IDatabase } from "pg-promise";
import { PgConnection } from "../services/pgConnection.services";
import { readFileSync } from 'node:fs';
import path from 'node:path';


export class ConfigModel {
  private db: IDatabase<unknown>;

  constructor() {
    this.db = PgConnection.getInstance().connection;
  }

  async resetSchema() {
    await this.db.query(`
      DROP SCHEMA IF EXISTS public CASCADE;
      CREATE SCHEMA public;
    `);
  }

  async createBaseDatos(){
    this.resetSchema()
    const sqlPath = path.join(__dirname, '../sql/back_scripta_plain.sql');
    const sql = readFileSync(sqlPath, 'utf8');

    return await this.db.query(`${sql}`)
  }

  async consultConfig(id_user: number) {
    return await this.db.query(
      `select 
        s.id_setting as "idSetting",
        s.state,
        s.tone,
        s.state_dictionarie as "stateDictionary",
        s.verbosity,
        p.domain,
        d.word
      from settings as s 
      full join users as u
        on s.users_id = u.id
      full join pages as p
        on s.id_setting = p.setting_id
      full join dictionaries as d
        on s.id_setting = d.setting_id
      where u.id = $1`,
      [id_user]
    );
  }

  async updateConfig(id_setting : number, state: boolean, tone: string, verbosity: string, stateDictionary:boolean){
    return await this.db.query(`
        UPDATE SETTINGS
        SET 
            State = $2,
            Tone = $3,
            Verbosity = $4,
            State_dictionarie = $5
        WHERE Id_setting = $1;
    `, [id_setting, state, tone, verbosity, stateDictionary])

  }

  async postPages(settingId: number, arrayDomains: string[]){
    try{
      await this.db.query(`DELETE FROM pages 
        WHERE setting_id = $1`, [settingId])

      if(arrayDomains.length > 0){
        const insertValues: string[] = [];
        const params: string[] = [];
  
        arrayDomains.forEach((domain, index) => {
          insertValues.push(`($1, $${index + 2})`);
          params.push(domain);
        });

        const query = `
          INSERT INTO pages (setting_id, domain)
          VALUES ${insertValues.join(', ')}
        `;
 
        await this.db.query(query, [settingId, ...params]);
      }
      return true
    }catch(error){
      return false
    }
  }

  async postDictionary(settingId: number, dictionary: string[]){
    try{
      await this.db.query(`DELETE FROM dictionaries 
        WHERE setting_id = $1`, [settingId])

      if(dictionary.length > 0){
        const insertValues: string[] = [];
        const params: string[] = [];
  
        dictionary.forEach((word, index) => {
          insertValues.push(`($1, $${index + 2})`);
          params.push(word);
        });
  
        const query = `
          INSERT INTO dictionaries (setting_id, word)
          VALUES ${insertValues.join(', ')}
        `;
        
  
        await this.db.query(query, [settingId, ...params]);
      }
      return true
    }catch(error){
      return false
    }
  }
}
