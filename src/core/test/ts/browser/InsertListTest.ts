import { Pipeline } from '@ephox/agar';
import { LegacyUnit } from '@ephox/mcagar';
import DOMUtils from 'src/core/main/ts/api/dom/DOMUtils';
import DomParser from 'src/core/main/ts/api/html/DomParser';
import Schema from 'src/core/main/ts/api/html/Schema';
import InsertList from 'src/core/main/ts/InsertList';
import { UnitTest } from '@ephox/bedrock';

UnitTest.asynctest('browser.tinymce.core.InsertListTest', function () {
  const success = arguments[arguments.length - 2];
  const failure = arguments[arguments.length - 1];
  const suite = LegacyUnit.createSuite();
  const schema = Schema({});

  const createFragment = function (html) {
    const parser = DomParser({ validate: false });
    const fragment = parser.parse(html);

    return fragment;
  };

  const createDomFragment = function (html) {
    return DOMUtils.DOM.createFragment(html);
  };

  suite.test('isListFragment', function () {
    LegacyUnit.equal(InsertList.isListFragment(schema, createFragment('<ul><li>x</li></ul>')), true);
    LegacyUnit.equal(InsertList.isListFragment(schema, createFragment('<ol><li>x</li></ol>')), true);
    LegacyUnit.equal(InsertList.isListFragment(schema, createFragment('<meta><ul><li>x</li></ul>')), true);
    LegacyUnit.equal(InsertList.isListFragment(schema, createFragment('<ul><li>x</li></ul><span id="mce_marker"></span>')), true);
    LegacyUnit.equal(InsertList.isListFragment(schema, createFragment('<ul><li>x</li></ul><p><br></p>')), true);
    LegacyUnit.equal(InsertList.isListFragment(schema, createFragment('<ul><li>x</li></ul><p></p>')), true);
    LegacyUnit.equal(InsertList.isListFragment(schema, createFragment('<ul><li>x</li></ul><p>\u00a0</p>')), true);
    LegacyUnit.equal(InsertList.isListFragment(schema, createFragment('<ul><li>x</li></ul><p>x</p>')), false);
    LegacyUnit.equal(InsertList.isListFragment(schema, createFragment('<div></div>')), false);
  });

  suite.test('listItems', function () {
    const list = createDomFragment('<ul><li>a</li><li>b</li><li>c</li></ul>').firstChild;

    LegacyUnit.equal(InsertList.listItems(list).length, 3);
    LegacyUnit.equal(InsertList.listItems(list)[0].nodeName, 'LI');
  });

  suite.test('trimListItems', function () {
    const list = createDomFragment('<ul><li>a</li><li>b</li><li></li></ul>').firstChild;

    LegacyUnit.equal(InsertList.listItems(list).length, 3);
    LegacyUnit.equal(InsertList.trimListItems(InsertList.listItems(list)).length, 2);
  });

  Pipeline.async({}, suite.toSteps({}), function () {
    success();
  }, failure);
});
