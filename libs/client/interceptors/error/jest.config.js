module.exports = {
  name: 'interceptors-error',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/interceptors/error',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
