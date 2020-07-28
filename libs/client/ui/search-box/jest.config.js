module.exports = {
  name: 'client-ui-search-box',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/client/ui/search-box',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
