import Uuid from 'tinymce/src/themes/inlite/main/ts/alien/Uuid';
import { UnitTest, assert } from '@ephox/bedrock';

UnitTest.test('atomic.themes.alien.UuidTest', function () {
  const testUuid = function () {
    assert.eq(Uuid.uuid('mce').indexOf('mce'), 0);
    assert.eq(Uuid.uuid('mce') !== Uuid.uuid('mce'), true);
  };

  testUuid();
});
