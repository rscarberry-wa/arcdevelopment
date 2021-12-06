import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Button, Tabs, Tab, Toolbar } from "@material-ui/core";
import { useScrollTrigger } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
}
  
const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em'
    },
    logo: {
        height: '8em'
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px'
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '50px',
        marginLeft: '50px',
        marginRight: '25px',
        height: '45px'
    }
}));

const Header = (props) => {

    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, value) => setTabIndex(value);

    const location = useLocation();
    
    useEffect(() => {
        let ndx = 0;
        switch (location.pathname) {
            case "/":
                ndx = 0;
                break;
            case "/services":
                ndx = 1;
                break;
            case "/revolution":
                ndx = 2;
                break;
            case "/about":
                ndx = 3;
                break;
            case "/contact":
                ndx = 4;
                break;
            default:
                break;
        }
        if (ndx !== tabIndex) {
            setTabIndex(ndx);
        }
    }, [location.pathname, tabIndex]);

    return (
        <>
        <ElevationScroll>
            <AppBar position={'fixed'} color={'primary'}>
                <Toolbar disableGutters>
                    <Button component={Link} to="/" disableRipple className={classes.logoContainer}>
                        <img alt={'company logo'} className={classes.logo} src={logo} />
                    </Button>
                    <Tabs 
                        value={tabIndex} 
                        onChange={handleChange} 
                        className={classes.tabContainer}
                        indicatorColor='primary'>
                        <Tab className={classes.tab} component={Link} to="/" label={'Home'} />
                        <Tab className={classes.tab} component={Link} to="/services" label={'Services'} />
                        <Tab className={classes.tab} component={Link} to="/revolution" label={'The Revolution'} />
                        <Tab className={classes.tab} component={Link} to="/about" label={'About Us'} />
                        <Tab className={classes.tab} component={Link} to="/contact" label={'Contact Us'} />
                    </Tabs>
                    <Button variant='contained' color='secondary' className={classes.button}>Free Estimate</Button>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin} />
        </>
    );
}

export default Header;
