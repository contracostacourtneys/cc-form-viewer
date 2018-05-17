import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
import PDFJS from 'pdfjs-dist';


class App extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    PDFJS.getDocument('//localhost:3000/pdf/SC-100')
      .then((pdf) => {
        console.dir(pdf);
      })
      .catch((error) => {
        console.error('ERROR: PDFJS.getDocument() -', error);
      });
  }

  render () {
    return (
      <div className='main-app'>
        App
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {

  };
};


export default connect(mapStateToProps)(App);
