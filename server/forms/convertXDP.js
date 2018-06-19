const fs = require('fs-extra');
const path = require('path');
const has = require('has-own-property-x');
const beautify = require('js-beautify').js_beautify;

const { parseString } = require('xml2js');
const { promisify } = require('util');
const parseStringAsync = promisify(parseString);

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';


const convertResult = (element, tag = '') => {
  const converted = {
    tag,
    attributes: {},
    children: [],
  };

  for (let i in element) {
    const field = element[i];

    if (i === '$') {
      converted.attributes = field;
      continue;
    }

    if (i === '_') {
      converted.children.push(field);
      continue;
    }

    if (Array.isArray(field)) {
      const children = field;

      for (let j = 0; j < children.length; j++) {
        const child = children[j];

        if (typeof child === 'object') {
          converted.children.push(convertResult(child, i));
        }
        else if (child !== '') {
          converted.children.push(child);
        }
      }
    }
    else if (typeof field === 'object') {
      converted.children.push(convertResult(field, i));
    }
  }

  return converted;
};

const convertXDP = (database, formName, filePath, callback) => {
  if (callback === '') {
    return;
  }

  if (database === '' || filePath === '') {
    callback(500, '');
    return;
  }

  filePath = path.join(__dirname, '../' + filePath);

  fs.readFile(filePath + '.xdp').then((data) => {
    parseString(data, (parseError, result) => {
      if (parseError) {
        console.error('Parse Error:', parseError);
        callback(500, '');
        return;
      }

      const form = convertResult(result, 'root');
      const style = { 
        indent_size: 2, brace_style: 'expand' 
      };

      fs.writeFile(filePath + '.json', beautify(JSON.stringify(form), style))
        .then((result) => {
          callback(200, result);
        })
        .catch((writeError) => {
          console.error('Write Error:', writeError);
          callback(500, '');
        });
      });
    })
    .catch((readError) => {
      console.error('Read Error:', readError);
    });
};

module.exports = convertXDP;
