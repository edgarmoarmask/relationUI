import {IEntityDateGroup} from "@eagleye/shared/models";

export function getGroupEntitiesIds(selectedDates: string[], dateGroups: IEntityDateGroup[]): string[] {

  let ids: string[] = [];

  dateGroups
    .filter(group => selectedDates.includes(group.date))
    .forEach(group => {

      ids = [...ids, ...group.entities];
    });

  if (ids.length > 0)
    ids = [...new Set(ids)];

  return ids;
}
