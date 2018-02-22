import SmoothAnimation from 'tinymce/themes/mobile/ios/smooth/SmoothAnimation';
import { UnitTest, assert } from '@ephox/bedrock';
UnitTest.test('Smooth Animation AdjustTest', function () {
    var checkNone = function (label, value, destination, amount) {
        var actual = SmoothAnimation.adjust(value, destination, amount);
        assert.eq(true, actual.isNone(), 'Test: ' + label + '. Expected none but was: ' + actual.toString());
    };
    var check = function (label, expected, value, destination, amount) {
        var actual = SmoothAnimation.adjust(value, destination, amount);
        assert.eq(true, actual.is(expected), 'Test: ' + label + '. Expected some(' + expected + ') but was: ' + actual.toString());
    };
    checkNone('Already at target', 10, 10, 5);
    checkNone('Within target from below', 9, 10, 5);
    checkNone('Within target from above', 11, 10, 5);
    checkNone('-Amount away from target', 8, 10, 2);
    checkNone('+Amount away from target', 12, 10, 2);
    check('Far above target', 100, 200, 50, 100);
    check('Far below target', 100, 0, 250, 100);
});
//# sourceMappingURL=SmoothAnimationTest.js.map