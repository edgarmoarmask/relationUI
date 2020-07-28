import {Injectable} from '@nestjs/common';

import {readdirSync} from 'fs';
import {join} from 'path';

import xlsx from "node-xlsx";

import {Configuration} from "../config";

@Injectable()
export class FoldersService {

  private readonly DB_NAME: string = 'EagleyeSampleDb.xlsx';
  private readonly DB_PATH: string = '../../../../../db';

  getFolders(): string[] {

    const folders: string[] = readdirSync(join(__dirname, this.DB_PATH), <any>{withFileTypes: true})
      .filter(directory => (<any>directory).isDirectory())
      .map(folder => (<any>folder).name);

    return folders;
  }

  setWorkFolder(folderName: string): void {

    const db = xlsx.parse(join(__dirname, `${this.DB_PATH}/${folderName}/`, this.DB_NAME));

    Configuration.initDB(db);
  }
}
