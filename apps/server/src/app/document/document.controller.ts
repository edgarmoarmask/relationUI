import {Controller, Get, Param} from '@nestjs/common';

import {IDocument} from '@eagleye/shared/models';

import {DocumentService} from './document.service';

@Controller('document')
export class DocumentController {

  constructor(private documentService: DocumentService) {
  }

  @Get()
  getDocuments(): IDocument[] {

    return this.documentService.getDocuments();
  }

  @Get('text/:id')
  getDocumentTextById(@Param('id') id: string): {text: string} {

    return this.documentService.getDocumentTextById(id);
  }
}
