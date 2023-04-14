import { useState, useImperativeHandle, forwardRef } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <Box>
      <Box style={hideWhenVisible} marginBottom={3}>
        <Button variant="contained" size="small" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>
      <Box style={showWhenVisible} marginBottom={3}>
        {props.children}
        <Button variant="contained" size="small" onClick={toggleVisibility}>
          cancel
        </Button>
      </Box>
    </Box>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
