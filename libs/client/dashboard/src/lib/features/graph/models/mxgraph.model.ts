import {mxgraph} from "mxgraph";

declare var require: any;

export const mx: typeof mxgraph = require('mxgraph')({
  mxBasePath: 'mxgraph'
});

