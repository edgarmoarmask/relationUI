module.exports = {
  name: 'client-directives',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/directives',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
