export interface IAnnotator {
  content: string;
  labelCategories: IAnnotatorLabelCategory[];
  labels: IAnnotatorLabel[];
  connectionCategories: IAnnotatorConnectionCategory[];
  connections: IAnnotatorConnection[];
}

export interface IAnnotatorLabelCategory {
  id: string | number;
  text: string;
  color: string;
  borderColor: string;
}

export interface IAnnotatorLabel {
  id: string | number;
  categoryId: string | number;
  startIndex: number,
  endIndex: number
}

export interface IAnnotatorConnectionCategory {
  id: string | number;
  text: string;
}

export interface IAnnotatorConnection {
  id: string | number;
  categoryId: string | number;
  fromId: string | number;
  toId: string | number;
}
