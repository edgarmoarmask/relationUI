import {Body, Controller, Get, Post} from '@nestjs/common';

import {FoldersService} from "./folders.service";

@Controller('folders')
export class FoldersController {

  constructor(private foldersService: FoldersService) {}

  @Get()
  getFolders(): string[] {

    return this.foldersService.getFolders();
  }

  @Post()
  setWorkFolder(@Body() body: {folderName: string}): any {
   
    return this.foldersService.setWorkFolder(body.folderName);
  }
}
