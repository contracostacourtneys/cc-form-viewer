import React from 'react';


const Textbox = (props) => {
  const multiplier = 1.25;

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
      />
    )
  }

  return (
    <input 
      type='text'
      className='component'

      style={style}
    />
  );
};

export default Textbox;
