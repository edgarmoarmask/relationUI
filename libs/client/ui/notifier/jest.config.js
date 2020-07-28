module.exports = {
  name: 'client-ui-notifier',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/client/ui/notifier',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
