import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Input, TextField , Box, FormGroup, Button } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert  from '@mui/material/Alert';
import { addUser } from '../services/userSevice';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    first_name: "",
    last_name : "",
    email: "",
    phone: "",
    address: ""
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(initialValue);
    const {first_name, last_name, email, phone, address} = user;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const addUserDetails = async () =>{
        if(user.first_name !== "" && user.last_name !== "" && user.email !== "" && user.phone !== "" && user.address !== "") {
            let response = await addUser(user);
            if(response.status === 200) {
                navigate('/all-user');
            }else {
                setOpen(true);
                setMessage("User not added")
            }
        }else {
            setOpen(true);
            setMessage("Please all field is mendatory")
        }
       
    }

    return (
        <Container maxWidth="sm">
            <Box my={5}><br/>
            <Typography variant="h5" align="center">Add User Details</Typography>
            <FormGroup>
                <FormControl>
                    <InputLabel>First Name</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="first_name" value={first_name} />
                </FormControl>
                <FormControl>
                    <InputLabel>Last Name</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="last_name" value={last_name} />
                </FormControl>
                <FormControl>
                    <InputLabel>Email address</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="email" value={email} />
                </FormControl>
                <FormControl>
                    <InputLabel>Phone Number</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="phone" value={phone} />
                </FormControl>
                <FormControl>
                    <TextField multiline minRows={3} id="standard-multiline-static" label="Address" variant="standard" onChange={(e) => onValueChange(e)} name="address" value={address} />
                </FormControl><br/>
                <Box my={3}>
                    <Button variant="contained" onClick={() => addUserDetails() } color="primary" align="center">Add User</Button>
                    <Button onClick={()=> navigate("/all-user")} variant="contained" color="secondary" align="center" style={{margin: '0px 20px'}}>Cancel</Button>
                </Box>
            </FormGroup>
            </Box>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </Stack>
        </Container>
    )
}


export default AddUser;