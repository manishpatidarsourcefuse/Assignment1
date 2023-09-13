import React from 'react';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    header: {
        backgroundColor: '#212121',
    },
    spacing :{
        paddingLeft: 20,
        color: '#fff',
        fontSize: '18px',
        textDecoration: 'none',
    }
  });

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.header} position="static">
            <Toolbar >
                <NavLink to="/" className={classes.spacing}> Home </NavLink>
                <NavLink to="all-user" className={classes.spacing}> All Users</NavLink>
                <NavLink to="add-user" className={classes.spacing}> Add Users</NavLink>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
