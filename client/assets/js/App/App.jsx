import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import PDFJS from 'pdfjs-dist';
import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

import fromJSON from 'Utility/fromJSON';
import fromPDF from 'Utility/fromPDF';

import Topbar from 'App/Topbar.jsx';
import Form from 'Form/Form.jsx';

const has = require('has-own-property-x');
const uuid = require('uuid/v4');
const queryString = require('query-string');

const config = require('Root/config');


class App extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    const search = queryString.parse(window.location.search);

    if (has(search, 'form')) {
      const formID = search.form.replace(/\//g, '');  // Remove trailing slash(es)

      axios.get(config.database.addresses.forms + formID)
        .then((result) => {
          fromJSON(result.data);

          PDFJS.getDocument(config.database.addresses.PDFs + formID)
            .then((pdf) => {
              fromPDF(pdf);
            })
            .catch((error) => {
              console.error('Error fetching PDF:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching form data:', error)
        });
    }
  }

  render () {
    return (
      <div className='main-app'>
        <Topbar />
        {
          this.props.forms.length <= 0 ? ''
            : <Form pageIndex={this.props.currentPage} key={this.props.currentPage} />
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    currentPage: state.global.currentPage,
    forms: state.forms,
  };
};


export default connect(mapStateToProps)(App);
