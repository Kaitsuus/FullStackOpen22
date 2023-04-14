
import React from "react";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Button from '@mui/material/Button';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Box } from '@mui/material';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

const SetBirthyear = ({ names }) => {
    const [name, setName] = useState("");
    const [born, setBorn] = useState("");
    const [open, setOpen] = React.useState(false);
    const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{query: ALL_AUTHORS }],
    });

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });      

    const handleSubmit = async (event) => {
        event.preventDefault();
        editAuthor({ variables: { name, setBornTo: parseInt(born) }});
        setName("");
        setBorn("");
        setOpen(true)
    };
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    useEffect(() => {
        if (result.data && result.data.editAuthor === null) {
            setOpen(false)
        }
    }, [result.data]);

    return(
        <Box>
            <h2>Set birthyear</h2>
            <Box component="form" onSubmit={handleSubmit}>
                <Box paddingBottom={1}>
                    <Select size="small" value={name} onChange={({ target }) => setName(target.value)}>
                        {names.map((name, i) => (
                            <MenuItem key={i} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box paddingBottom={1}>
                    <TextField 
                        size="small"
                        type="number"
                        value={born}
                        placeholder="Year"
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </Box>
                <Box>
                    <Button variant="contained" size="small" type="submit">
                        Update author
                    </Button>
                </Box>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Author updated!
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    )
};
export default SetBirthyear;