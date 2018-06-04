import React, { Component } from 'react';
import { connect } from 'react-redux';

import Textbox from 'Components/Textbox/Textbox.jsx';
import Checkbox from 'Components/Checkbox/Checkbox.jsx';

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
      // FIXME: hahahahaha this codebase is such a clusterfuck already
      // This >>IS NOT<< the way to do this properly and I'm perfectly aware of that
      // I don't have the time or want to fiddle with this shit right now
      setTimeout(this.componentDidMount.bind(this), 1000);
      return;
    }

    // REALLY not good
    this.setState({
      pageView: new PDFPageView({
        id: pageIndex,
        container: document.getElementById(`--Form--Page_${pageIndex}--`),
        scale: this.state.scale,
        defaultViewport: form.viewport,
        annotationLayerFactory: new DefaultAnnotationLayerFactory(),
      })
    });

    // bad bad bad bad
    setTimeout(() => {
      this.state.pageView.setPdfPage(form.page);
      this.state.pageView.draw();
    }, 1);
  }

  render () {
    const components = { ...this.props.textboxes, ...this.props.checkboxes };
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
              return <Textbox key={`Textbox-${pageIndex}-${index}`} { ...component } />;
            }
            else if (component.type === 'Checkbox') {
              return <Checkbox key={`Checkbox-${pageIndex}-${index}`} { ...component } />;
            }
          })
        }

        {/* This app is well-coded */}
        <div className='button-cover'>
          &nbsp;
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    forms: state.forms,
    textboxes: state.textboxes,
    checkboxes: state.checkboxes,
  };
};


export default connect(mapStateToProps)(Form);
