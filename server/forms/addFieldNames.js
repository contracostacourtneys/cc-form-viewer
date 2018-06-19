const has = require('has-own-property-x');


const addFieldNames = (pdfData) => {
  const components = pdfData.components;

  for (let i in components) {
    const component = components[i];
    const nameArr = component.pdf_fieldName.split('.');
    const length = nameArr.length;
    const lastItem = nameArr[length - 1];

    if (length > 0 && typeof lastItem === 'string') {
      const firstBracketIndex = lastItem.indexOf('[');
      const fieldName = lastItem.substring(0, firstBracketIndex);
      const fieldIndex = lastItem.substring(firstBracketIndex + 1, lastItem.indexOf(']'));

      component.fieldName = fieldName;
      component.fieldIndex = fieldIndex;
    }
  }

  return components;
};


module.exports = addFieldNames;
