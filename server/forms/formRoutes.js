const fs = require('fs-extra');
const path = require('path');
const has = require('has-own-property-x');

const Canvas = require('canvas');
const Image = Canvas.Image;

const formPaths = require('./formPaths.js');
const getForm = require('./getForm.js');
const putForm = require('./putForm.js');
const convertPDF = require('./convertPDF.js');
// const convertXDP = require('./convertXDP.js');
const addFieldNames = require('./addFieldNames.js');

const PDFJS = require('pdfjs-dist');


module.exports = (express, server, database) => {
  server.get('/form/:formID', (req, res) => {
    let formID = req.params.formID || '';

    if (formID === '') {
      res.sendStatus(404);
      return;
    }

    formID = formID.toUpperCase();
    const formPath = formPaths[formID];

    getForm(database, formID, (statusCode, result) => {
      if (statusCode === 404) {
        const pdfPath = path.join(__dirname, `../${formPath}.pdf`);
        const pdfRaw = new Uint8Array(fs.readFileSync(pdfPath));

        PDFJS.getDocument(pdfRaw)
          .then((pdf) => {
            convertPDF(formID, pdf, (conversionError, conversionResult) => {
              if (conversionError !== 200) {
                res.sendStatus(conversionError);
                return;
              }

              addFieldNames(conversionResult);
              putForm(database, formID, conversionResult, () => {});

              res.send(JSON.stringify(conversionResult));
            });
          })
          .catch((error) => {
            console.log('Error reading PDF:', error);
            res.sendStatus(500);
          });
      }
      else if (statusCode !== 200) {
        res.sendStatus(statusCode);
        return;
      }
      else {
        res.send(result);
      }
    });
  });

  server.get('/pdf/:pdfName', (req, res) => {
    let pdfName = req.params.pdfName || '';

    if (pdfName === '') {
      res.sendStatus(404);
      return;
    }

    pdfName = pdfName.toUpperCase();
    const pdfPath = path.join(__dirname, `../${formPaths[pdfName]}.pdf`);

    if (!fs.existsSync(pdfPath)) {
      res.sendStatus(404);
      return;
    }

    res.sendFile(pdfPath);
  });
};
