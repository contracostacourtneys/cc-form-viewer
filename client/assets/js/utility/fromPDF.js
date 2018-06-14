import store from 'Root/main';
import { addComponent } from 'Components/shared/actions';
import { addFormPage } from 'Form/actions';

const has = require('has-own-property-x');


const fromPDF = (pdf) => {
  const numPages = pdf.numPages;

  for (let i = 1; i <= numPages; i++) {
    pdf.getPage(i).then((page) => {
      addFormPage(i - 1, page);
    });
  }
};


module.exports = fromPDF;
