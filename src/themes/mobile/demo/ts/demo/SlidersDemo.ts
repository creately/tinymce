import { Attachment, Container, Gui, GuiFactory } from '@ephox/alloy';
import { Fun } from '@ephox/katamari';
import { SelectorFind } from '@ephox/sugar';

import ColorSlider from 'tinymce/src/themes/mobile/main/ts/ui/ColorSlider';
import FontSizeSlider from 'tinymce/src/themes/mobile/main/ts/ui/FontSizeSlider';
import UiDomFactory from 'tinymce/src/themes/mobile/main/ts/util/UiDomFactory';

export default function () {
  const ephoxUi = SelectorFind.first('#ephox-ui').getOrDie();

  const fontSlider = Container.sketch({
    dom: UiDomFactory.dom('<div class="${prefix}-toolbar ${prefix}-context-toolbar"></div>'),
    components: [
      {
        dom: UiDomFactory.dom('<div class="${prefix}-toolbar-group"></div>'),
        components: FontSizeSlider.makeItems({
          onChange: Fun.noop,
          getInitialValue: Fun.constant(2)
        })
      }
    ]
  });

  const colorSlider = Container.sketch({
    dom: UiDomFactory.dom('<div class="${prefix}-toolbar ${prefix}-context-toolbar"></div>'),
    components: [
      {
        dom: UiDomFactory.dom('<div class="${prefix}-toolbar-group"></div>'),
        components: ColorSlider.makeItems({
          onChange: Fun.noop,
          getInitialValue: Fun.constant(-1)
        })
      }
    ]
  });

  const gui = Gui.create();
  Attachment.attachSystem(ephoxUi, gui);

  const container = GuiFactory.build({
    dom: UiDomFactory.dom('<div class="{prefix}-outer-container ${prefix}-fullscreen-maximized"></div>'),
    components: [
      {
        dom: UiDomFactory.dom('<div class="${prefix}-toolstrip"></div>'),
        components: [ fontSlider ]
      },
      {
        dom: UiDomFactory.dom('<div class="${prefix}-toolstrip"></div>'),
        components: [ colorSlider ]
      }
    ]
  });

  gui.add(container);
}