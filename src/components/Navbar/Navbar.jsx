import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, /*MenuItem, Menu,*/ Typography } from '@material-ui/core';
import { ShoppingCart,Favorite } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/commerce.png';
import useStyles from './styles';

const Navbar = ({ totalItems, favTotalItems }) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
           <AppBar position='fixed' className={classes.appBar} color="inherit">
               <Toolbar>
                   <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                       <img src={logo} alt="CompanyLogo" height="45px" className={classes.image} />
                       E-Store
                   </Typography>
                  
                   <div className={classes.grow} />
                   {location.pathname==="/" && (
                   <div className={classes.button}>
                       <IconButton component={Link} to="/favorite" aria-label="Show favorite items" color="inherit">
                            <Badge badgeContent={favTotalItems} color={'secondary'}>
                                <Favorite/>
                            </Badge>
                        </IconButton>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color={'secondary'}>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                   </div>
                   )}
               </Toolbar>
           </AppBar>
        </>
    )
}

export default Navbar
