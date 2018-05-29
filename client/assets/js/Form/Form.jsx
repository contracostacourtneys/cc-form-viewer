import React, { Component } from 'react';
import { connect } from 'react-redux';

import Textbox from 'Components/Textbox/Textbox.jsx';

import { PDFPageView, DefaultAnnotationLayerFactory } from 'pdfjs-dist/web/pdf_viewer.js';

const uuid = require('uuid/v4');


class Form extends Component {
  constructor (props) {
    super(props);

    this.state = {
      scale: 1.0,
      pageView: ''
    };
  }

  componentDidMount () {
    const pageIndex = this.props.pageIndex;
    const form = this.props.forms[pageIndex] || '';

    if (form === '') {
      return;
    }

    this.setState({
      pageView: new PDFPageView({
        id: pageIndex,
        container: document.getElementById(`--Form--Page_${pageIndex}--`),
        scale: this.state.scale,
        defaultViewport: form.viewport,
        annotationLayerFactory: new DefaultAnnotationLayerFactory(),
      })
    });

    setTimeout(() => {
      this.state.pageView.setPdfPage(form.page);
      this.state.pageView.draw();
    }, 1);
  }

  render () {
    const components = { ...this.props.textboxes };
    const pageIndex = this.props.pageIndex;
    const form = this.props.forms[pageIndex] || '';

    if (form === '') {
      return '';
    }

    const formComponents = form.components;

    return (
      <div id={`--Form--Page_${pageIndex}--`} style={{ position: 'relative' }}>
        {
          formComponents.map((formComponent, index) => {
            const component = components[formComponent.id];

            if (typeof component === 'undefined') {
              return '';
            }

            if (component.type === 'Textbox') {
              return <Textbox key={uuid()} { ...component } />;
            }
          })
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    forms: state.forms,
    textboxes: state.textboxes,
  };
};


export default connect(mapStateToProps)(Form);
