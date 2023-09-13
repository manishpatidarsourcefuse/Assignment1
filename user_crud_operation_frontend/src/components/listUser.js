import React, { useEffect, useState } from 'react';
import {Table, TableCell, TableRow, TableHead, TableBody, makeStyles, Button } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert  from '@mui/material/Alert';
import { deleteUser ,listUser } from '../services/userSevice';
import { Link } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyle = makeStyles({
    table: {
        width: '80%',
        margin: '50px 100px 100px 140px',
    },
    thead:{
        '& > *':{
            background: '#000000',
            color:'#FFFFFF',
            fontSize: '16px'
        }
    },
    trow:{
        '& > *':{
            fontSize: '16px'
        }
    }
})

const ListUsers = () => {
    const classes = useStyle();
    const [user, setUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);


    useEffect(() => {
        getUsers();
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const getUsers = async () =>{
        let response = await listUser();
        if(response.status === 200){
            setUser(response.data.user);
        }else {
            setOpen(true)
            setMessage("User is not exist in list")
        }
    }

    const deleteData = async (id) => {
        let response = await deleteUser(id);
        if(response.status === 200) {
            getUsers();
            setOpen(true)
            setMessage(response.data.message)
        }else {
            setOpen(true)
            setError(true)
            setMessage("User not deleted")
        }
        
    }

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell>ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                user.map((data) => (
                    <TableRow className={classes.trow} key={data.id}>
                        <TableCell>{data.id}</TableCell>
                        <TableCell>{data.first_name}</TableCell>
                        <TableCell>{data.last_name}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell>{data.phone}</TableCell>
                        <TableCell>{data.address}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" style={{margin: '0px 20px'}} component={Link} to={`/edit/${data.id}`}>Edit</Button>
                            <Button variant="contained" color="secondary" style={{margin: '0px 20px'}} onClick={() => deleteData(data.id)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))
            }
            </TableBody>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    {
                        error ?
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                        :
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    }
                </Snackbar>
            </Stack>
        </Table>
    )
}

export default ListUsers;
