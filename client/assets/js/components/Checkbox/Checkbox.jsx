import React from 'react';


const Checkbox = (props) => {
  // wooo magic numbers
  // FIXME: please, thanks
  const style = {
    left: (props.x * 1.27),
    top: (props.y * 1.21) + 785,
    width: (props.width * 1.26),
    height: (props.height * 1.15),
  };

  return (
    <input 
      type='checkbox'
      className='component'

      style={style}
    />
  );
};

export default Checkbox;
