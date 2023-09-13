import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';


const User = () => {
    return (
        <Container maxWidth="lg">
            <Box my={5}>
            <Typography variant="h3" component="h2" align="center">Welcome User</Typography>
            </Box>
        </Container>
    )
}

export default User;