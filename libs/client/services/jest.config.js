module.exports = {
  name: 'client-services',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/client/services',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
