import { LegacyUnit } from '@ephox/mcagar';
import { Pipeline } from '@ephox/agar';
import * as ExtendingChar from 'tinymce/core/text/ExtendingChar';
import { UnitTest } from '@ephox/bedrock';
UnitTest.asynctest('atomic.tinymce.core.text.ExtendingCharTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    var suite = LegacyUnit.createSuite();
    suite.test('isExtendingChar', function () {
        LegacyUnit.strictEqual(ExtendingChar.isExtendingChar('a'), false);
        LegacyUnit.strictEqual(ExtendingChar.isExtendingChar('\u0301'), true);
    });
    Pipeline.async({}, suite.toSteps({}), function () {
        success();
    }, failure);
});
//# sourceMappingURL=ExtendingCharTest.js.map