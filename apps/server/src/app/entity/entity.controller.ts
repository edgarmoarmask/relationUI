import {Controller, Get, Param} from '@nestjs/common';

import {IEntity, IRelations, IMentions, IEntityProfile, IEntityDateGroup} from '@eagleye/shared/models';

import {EntityService} from './entity.service';

@Controller('entities')
export class EntityController {

  constructor(private entityService: EntityService) {
  }

  @Get('groups')
  getGroupedEntitiesByDates(): IEntityDateGroup[] {

    return this.entityService.getGroupedEntitiesByDates();
  }

  @Get('relations/:id')
  findRelations(@Param('id') id: string): IRelations {

    return this.entityService.findRelations(id);
  }

  @Get('mentions/:id')
  findMentions(@Param('id') documentId: string): IMentions {

    return this.entityService.findMentions(documentId);
  }

  @Get('profile/:id')
  getProfile(@Param('id') id: string): IEntityProfile {

    return this.entityService.getProfile(id);
  }

  @Get(':name')
  findByName(@Param('name') name: string): IEntity[] {

    return this.entityService.findByName(name);
  }
}
