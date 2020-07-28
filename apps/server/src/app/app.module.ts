import {Module} from '@nestjs/common';

import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';

import {environment} from "../environments/environment";

import {FoldersModule} from './folders/folders.module';
import {EntityModule} from './entity/entity.module';
import {DocumentModule} from './document/document.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: environment.production ? join(__dirname, '..', 'client/dashboard-area') : '',
    }),
    FoldersModule,
    EntityModule,
    DocumentModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
