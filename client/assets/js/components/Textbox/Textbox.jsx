import React from 'react';
import { setComponentValue } from 'Components/shared/actions';


const Textbox = (props) => {
  // wooo magic numbers
  // FIXME: please fix eventually, thanks
  const style = {
    left: (props.x * 1.34),
    top: (props.y * 1.21) + 785,
    width: (props.width * 1.26),
    height: (props.height * 1.15),
    fontSize: (props.fontSize * 1.1) + 'px',
    resize: 'none',
  };

  if (props.multiline) {
    return (
      <textarea 
        className='component'
        style={style}

        value={props.value}
        
        onChange={(event) => setComponentValue(props.id, 'Textbox', event.target.value)}
      />
    )
  }

  return (
    <input 
      type='text'
      className='component'

      style={style}
      value={props.value}

      onChange={(event) => setComponentValue(props.id, 'Textbox', event.target.value)}
    />
  );
};

export default Textbox;
