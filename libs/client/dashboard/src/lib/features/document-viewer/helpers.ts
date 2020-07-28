import {IEntityLabel, IEvent, IMention} from "@eagleye/shared/models";

export function createAnnotatorLabelCategories(entities: IEntityLabel[]): any {

  return entities.map(entity => {

    return {
      id: parseInt(entity.id),
      text: entity.name,
      color: "#eac0a2",
      borderColor: "#a38671"
    }
  })
}

export function createAnnotatorLabels(relations: IMention[]): any {

  return relations.map((relation, index) => {

    return {
      id: parseInt(relation.entityId),
      categoryId: parseInt(relation.entityId),
      startIndex: relation.startIndex,
      endIndex: relation.endIndex
    }
  })
}

export function createAnnotatorConnectionCategories(events: IEvent[]): any {

  return Array.from(
    new Set(events
      .map(event => ({ id: event.id, name: event.name }))
      .map(event => JSON.stringify(event)))
  ).map(event => JSON.parse(event)).map((event, index) => {

    return {
      id: event.id,
      text: event.name
    }
  })
}

export function createAnnotatorConnections(events: IEvent[]): any {

  return events.map((event, index) => {

    return {
      id: index,
      categoryId: event.id,
      fromId: parseInt(event.sourceId),
      toId: parseInt(event.targetId)
    }
  })
}
