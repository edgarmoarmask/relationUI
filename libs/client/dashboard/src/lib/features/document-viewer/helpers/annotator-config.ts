import {IEntityLabel, IEntityMention, IMentions, IEventMention} from "@eagleye/shared/models";

import {
  IAnnotator, IAnnotatorConnection, IAnnotatorConnectionCategory,
  IAnnotatorLabel,
  IAnnotatorLabelCategory
} from "@dashboard/features/document-viewer/models/annotator.model";

export function createAnnotatorConfiguration(text: string, mentions: IMentions): IAnnotator {

  const annotator: IAnnotator = {
    content: text,
    labelCategories: createAnnotatorLabelCategories(mentions.entities),
    labels: createAnnotatorLabels(mentions.entityMentions),
    connectionCategories: createAnnotatorConnectionCategories(mentions.eventMentions),
    connections: createAnnotatorConnections(mentions.eventMentions)
  };

  return annotator;
}

function createAnnotatorLabelCategories(entities: IEntityLabel[]): IAnnotatorLabelCategory[] {

  return entities.map(entity => {

    return {
      id: parseInt(entity.id),
      text: entity.type,
      color: "#eac0a2",
      borderColor: "#a38671"
    }
  })
}

function createAnnotatorLabels(entityMentions: IEntityMention[]): IAnnotatorLabel[] {

  return entityMentions.map((entityMention, index) => {

    return {
      id: parseInt(entityMention.uniqueId),
      categoryId: parseInt(entityMention.entityId),
      startIndex: parseInt(entityMention.startIndex),
      endIndex: parseInt(entityMention.endIndex)
    }
  })
}

function createAnnotatorConnectionCategories(eventMentions: IEventMention[]): IAnnotatorConnectionCategory[] {

  return Array
    .from(
      new Set(
        eventMentions
          .map(eventMention => ({id: eventMention.id, text: eventMention.name}))
          .map(eventMention => JSON.stringify(eventMention))
      )
    )
    .map(eventMention => JSON.parse(eventMention));
}

function createAnnotatorConnections(eventMentions: IEventMention[]): IAnnotatorConnection[] {

  let connections = eventMentions.map((eventMention, index) => {

    return {
      id: index + 1,
      categoryId: eventMention.id,
      fromId: parseInt(eventMention.sourceId),
      toId: parseInt(eventMention.targetId)
    }
  });

  return connections;
}
