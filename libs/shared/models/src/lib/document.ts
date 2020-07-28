import {IMentions} from "./mention";

export interface IDocumentLabel {
  id: string;
  name: string;
  date: string;
}

export interface IDocumentText {
  text: string;
}

export interface IDocument extends IDocumentText, IDocumentLabel {
  location: string;
}

export interface IDocumentView extends IDocumentText {
  mentions: IMentions;
}
