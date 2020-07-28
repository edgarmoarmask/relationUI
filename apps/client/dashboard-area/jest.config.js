module.exports = {
  name: 'dashboard-area',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/dashboard-area',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
