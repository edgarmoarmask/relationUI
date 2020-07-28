import {IDocument, IEntity, IEvent, IMention} from '@eagleye/shared/models';

import {excelDateToJSDate} from "../utils";

export class Configuration {

  public static Documents: IDocument[];
  public static Entities: IEntity[];
  public static Events: IEvent[];
  public static Mentions: IMention[];

  public static initDB(tables: any[]) {

    const documents = tables.find(table => table.name === 'Documents');
    const entities = tables.find(table => table.name === 'Entities');
    const entityMentions = tables.find(table => table.name === 'EntityMentions');
    const entityProperties = tables.find(table => table.name === 'EntityAttributes');
    const entityTypes = tables.find(table => table.name === 'EntityTypes');
    const events = tables.find(table => table.name === 'EventTypes');
    const eventMentions = tables.find(table => table.name === 'EventMentions');

    Configuration.initDocuments(documents.data.slice(1));
    Configuration.initEntities(
      entities.data.slice(1),
      entityTypes.data.slice(1),
      entityProperties.data.slice(1),
      entityMentions.data.slice(1),
      documents.data.slice(1)
    );
    Configuration.initEvents(
      events.data.slice(1),
      eventMentions.data.slice(1)
    );
    Configuration.initMentions(
      entityMentions.data.slice(1)
    )
  }

  private static initDocuments(documents: any[]): void {

    Configuration.Documents = documents.map(document => {

      return {
        id: `${document[0].toString()}document`,
        name: document[1] || '',
        location: document[2],
        date: excelDateToJSDate(document[3]),
        text: document[4] || '',
      } as IDocument
    });
  }

  private static initEntities(entities: any[], types: any[], properties: any[], mentions: any[], documents: any[]): void {

    Configuration.Entities = entities.map(entity => {
      return {
        id: `${entity[0].toString()}cell`,
        name: entity[1],
        type: entity[2] ? types.find(type => type[0] === entity[2])[1] : '',
        geoLocation: entity[3] || '',
        address: entity[4] || '',
        image: entity[5] || '',
        documents: mentions
          .filter(mention => mention[1] === entity[0])
          .map(mention => mention[0])
          .filter((docId, index, self) => self.indexOf(docId) === index)
          .map(docId => {

            return {
              id: `${docId.toString()}document`,
              name: documents.find(document => document[0] === docId)[1]
            };
          }),
        properties: properties
          .filter(property => property[0] === entity[0])
          .map(property => ({name: property[1], value: property[2], selected: true}))
      } as IEntity
    });
  }

  private static initEvents(events: any[], mentions: any[]): void {

    Configuration.Events = mentions.map(mention => {

      const relatedEvent = events.find(event => event[0] === mention[1]);

      return {
        id: relatedEvent[0],
        name: relatedEvent[1],
        description: relatedEvent[2],
        sourceId: `${mention[2].toString()}cell`,
        targetId: `${mention[3].toString()}cell`,
        documentId: `${mention[0].toString()}document`,
      } as IEvent
    });
  }

  private static initMentions(mentions: any[]): void {

    Configuration.Mentions = mentions.map(mention => {

      return {
        documentId: `${mention[0].toString()}document`,
        entityId: `${mention[1].toString()}cell`,
        startIndex: mention[2],
        endIndex: mention[3],
        date: excelDateToJSDate(mention[4])
      } as IMention
    });
  }
}
