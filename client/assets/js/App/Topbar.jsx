import React, { Component } from 'react';
import { connect } from 'react-redux';

import { previousPage, nextPage } from 'App/actions';


class Topbar extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='topbar'>
        <input 
          type='button'
          className='button'
          value={'\u276E  Previous'}

          onClick={previousPage}

          disabled={this.props.currentPage <= 0 ? true : null}
        />

        <input 
          type='button'
          className='button'
          value={'Next  \u276F'}

          onClick={nextPage}

          disabled={this.props.currentPage >= this.props.forms.length - 1}
        /> 
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


export default connect(mapStateToProps)(Topbar);