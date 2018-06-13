const fs = require('fs-extra');
const path = require('path');
const has = require('has-own-property-x');
const beautify = require('js-beautify').js_beautify;

const Canvas = require('canvas');
const Image = Canvas.Image;

// const NodeCanvasFactory = require('./NodeCanvasFactory.js');


const convertPDF = (name, pdf, callback) => {
  const converted = {
    name,
    forms: [],
    components: {}
  };

  const numPages = pdf.numPages;
  let pagesLeft = numPages;

  for (let i = 1; i <= numPages; i++) {
    pdf.getPage(i).then((page) => {
      const form = {
        id: `Page_${i}`,
        pageNumber: i,
        viewport: page.getViewport(1.0),
      };

      converted.forms.push(form);

      page.getAnnotations().then((annotations) => {
        convertComponents(converted.components, annotations, i - 1);
        pagesLeft--;

        if (pagesLeft <= 0) {
          callback(200, converted);
        }
      })
      .catch((error) => console.error('page.getAnnotations() - ERROR:', error));


      // Fonts are broken so never mind
      /*const canvasFactory = new NodeCanvasFactory();
      const scale = 2;
      const canvasAndContext = canvasFactory.create(form.viewport.width * scale, form.viewport.height * scale);

      const renderContext = {
        canvasContext: canvasAndContext.context,
        viewport: form.viewport,
        canvasFactory,
      };

      canvasAndContext.context.scale(scale, scale);

      page.render(renderContext).then(() => {
        const image = canvasAndContext.canvas.toBuffer();
        fs.writeFile(`./${name}_${i}.png`, image);
      })
      .catch((error) => {
        console.error('convertPDF() - ERROR:', error);
      });*/
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

const convertComponents = (componentsObj, components, pageIndex) => {
  const length = components.length;

  for (let i = 0; i < length; i++) {
    const component = components[i];

    // We don't want to deal with these; it's probably a button like "Print Form" or whatever
    if (component.pushButton) {
      // console.log('pushButton', component);
      continue;
    }

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

    componentsObj[component.id] = converted;
  }
};

module.exports = convertPDF;
