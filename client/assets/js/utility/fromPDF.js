import store from 'Root/main';
import { addComponent } from 'Components/shared/actions';
import { addForm } from 'Form/actions';

const has = require('has-own-property-x');


const fromPDF = (pdf) => {
  const numPages = pdf.numPages;

  for (let i = 1; i <= numPages; i++) {
    pdf.getPage(i).then((page) => {
      addForm({
        id: `Page_${page}`,
        page
      });

      page.getAnnotations().then(convertComponents, page);
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

const convertComponents = (components, page) => {
  const length = components.length;

  for (let i = 0; i < length; i++) {
    const component = components[i];

    console.dir(component);

    const rect = component.rect;
    const x = rect[0];
    const y = rect[1];

    const converted = {
      id: component.id,
      type: convertFieldType(component.fieldType),

      multiline: component.multiline,

      width: rect[2] - x,
      height: rect[3] - y,
      x, y,
    };

    addComponent(converted);
  }
};

module.exports = fromPDF;
