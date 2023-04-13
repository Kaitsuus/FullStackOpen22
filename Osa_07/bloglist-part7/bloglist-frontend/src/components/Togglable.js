import { useState, useImperativeHandle, forwardRef } from 'react';
import { Button } from './FormHelper';

export const Togglable = forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const hideWhenVisible = {
    display: visible ?
      'none' :
      ''
  };

  const showWhenVisible = {
    display: visible ?
      '' :
      'none'
  };

  useImperativeHandle(ref, () => (
    { togglableHandle: toggleVisibility }
  ));

  return (
    <div>

      <div style={hideWhenVisible}>
        <p>
          <Button
            style={{ cursor: 'pointer' }}
            type='button'
            onClick={toggleVisibility}
            text={props.buttonLabel}
            className={props.className}
          />
        </p>
      </div>

      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <p>
          <Button
            style={{ cursor: 'pointer' }}
            type='button'
            onClick={toggleVisibility}
            text='close'
          />
        </p>
      </div>

    </div>
  );
});

Togglable.displayName = 'Togglable';