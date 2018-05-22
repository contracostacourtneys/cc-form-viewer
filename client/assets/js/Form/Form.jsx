import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PDFPageView, DefaultAnnotationLayerFactory } from 'pdfjs-dist/web/pdf_viewer.js';

const uuid = require('uuid/v4');


class Form extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>{`Form #${this.props.page + 1}`}</div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    forms: state.forms,
  };
};


export default connect(mapStateToProps)(Form);
