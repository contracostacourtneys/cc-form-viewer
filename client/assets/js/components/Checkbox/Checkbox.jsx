import React from 'react';
import { setComponentValue } from 'Components/shared/actions';


const Checkbox = (props) => {
  // wooo magic numbers
  // FIXME: please fix eventually, thanks
  const style = {
    left: (props.x * 1.35) - 8,
    top: (props.y * 1.21) + 785,
    width: (props.width * 1.26),
    height: (props.height * 1.15),
  };

  return (
    <input 
      type='checkbox'
      className='component'

      style={style}
      checked={props.value ? true : null}

      onChange={(event) => setComponentValue(props.id, 'Checkbox', event.target.checked)}
    />
  );
};

export default Checkbox;
