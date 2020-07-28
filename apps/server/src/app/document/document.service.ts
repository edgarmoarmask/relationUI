import {Injectable} from '@nestjs/common';

import {IDocument} from '@eagleye/shared/models';

import {Configuration} from '../config';

@Injectable()
export class DocumentService {

  getDocuments(): IDocument[] {

    return Configuration.Documents;
  }

  getDocumentTextById(id: string): {text: string} {

    const {text} = Configuration.Documents.find(document => document.id === id);

    return {text};
  }
}
