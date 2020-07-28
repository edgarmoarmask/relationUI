import {TViewType} from "@dashboard/pages/layout/model";

export async function getCanvasModule(view: TViewType): Promise<any> {

  switch (view) {
    case 'graph':
      return await import('@dashboard/features/graph');
    case "map":
      return await import('@dashboard/features/map');
    default:
      throw Error('Error during loading of incorrect module!');
  }
}
