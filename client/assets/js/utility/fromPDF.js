import store from 'Root/main';
import { addComponent } from 'Components/shared/actions';
import { addForm } from 'Form/actions';

const has = require('has-own-property-x');


const fromPDF = (pdf) => {
  const numPages = pdf.numPages;

  for (let i = 1; i <= numPages; i++) {
    pdf.getPage(i).then((page) => {
      addForm({
        id: `Page_${i}`,
        pageNumber: i,
        viewport: page.getViewport(1.0),
        page,
      });

      page.getAnnotations().then((annotations) => {
        convertComponents(annotations, i - 1);
      });
    });
  }
};

const convertFieldType = (fieldType) => {
  switch (fieldType) {
    case 'Tx':
      return 'Textbox';

    case 'Btn':
      return 'Checkbox';
  }

  console.error(`convertFieldType() - Unknown type \`${fieldType}\`!`);
  return '';
};

const convertComponents = (components, pageIndex) => {
  const length = components.length;

  for (let i = 0; i < length; i++) {
    const component = components[i];

    // We don't want to deal with these; it's probably a button like "Print Form" or whatever
    if (component.pushButton) {
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!!!!!!');
      continue;
    }

    console.dir(component);

    const rect = component.rect;
    const x = rect[0];
    const y = rect[1];
    const width = rect[2] - x;
    const height = rect[3] - y;

    const converted = {
      id: component.id,
      type: convertFieldType(component.fieldType),

      multiline: component.multiline || false,

      pageIndex,
      width, height,
      x, y: ((-y + 200) * 1.1) - height,
    };

    const defaultAppearance = component.defaultAppearance.split(' ');
    let index = defaultAppearance.indexOf('Tf');

    if (index > 0) {
      converted.fontSize = defaultAppearance[index - 1];
    }
    else {
      converted.fontSize = 16;
    }

    // Because for some reason `multiline` seems to be false all on textboxes regardless
    if (converted.height >= converted.fontSize * 2) {
      converted.multiline = true;
    }

    addComponent(converted);
  }
};

module.exports = fromPDF;
