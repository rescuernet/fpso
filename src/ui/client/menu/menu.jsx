import * as React from 'react';
import {useEffect} from 'react';
import {Box, Drawer, IconButton, List, ListItem} from "@material-ui/core";
import {useHistory, useLocation} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {UI_RM} from "../../../routes/ui-routes";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    wrapper: {
    },
    root: {
        '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },
    },
    drawerPaper: {
        marginTop: 50,
        '& .MuiList-padding': {
            padding: '30px 10px 10px 10px'
        }
    },
    menuItem: {
        fontSize: 14,
        fontFamily: "Roboto",
        fontWeight: 400,
        color: "#004466",
        '& span': {
            fontSize: 0,
            padding: 0,
            margin: 0
        },
        textTransform: "uppercase"
    },
    activeLink: {
        color: "#ff6200!important",
        fontWeight: '700'
    },
    menuIcon: {
        fontSize: 40,
        /*'@media (max-width: 750px)': {
            fontSize: 30,
        },*/
    },
    divider: {
        backgroundColor: "#ff6200"
    },
}))


const Menu = (props) => {
    const menuItems = []
    for (let key in UI_RM) {menuItems.push(UI_RM[key])}

    const classes = useStyles()

    const location = useLocation().pathname;
    const history = useHistory()

    const anchor = 'left';
    const [state, setState] = React.useState({left: false});
    const [link, setLink] = React.useState('');

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state,[anchor]: open});
    };

    useEffect(() => {
        if(link) {
            const goToLink = setTimeout(() => {
                history.push(link)
            }, 300);
            return () => clearTimeout(goToLink);
        }
    }, [link,history]);

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem
                    button key={'main' + 1}
                    className={location === '/' ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                    onClick={()=> setLink('/')}
                >
                    {'Главная'}
                </ListItem>
                {menuItems.map((i) =>
                    i.menu?.type === 'main' &&
                    (<ListItem
                        button key={i.path}
                        className={location.includes(i.path) ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                        onClick={()=> setLink(i.path)}
                    >
                        {i.menu.title}
                    </ListItem>)
                )}
                <ListItem
                    button key={'admin' + 1}
                    onClick={()=> setLink('/5070/login/')}
                >
                    {'admin'}
                </ListItem>
            </List>
        </Box>
    );


    return (
        <div className={classes.wrapper}>
            <IconButton
                color={"inherit"}
                onClick={toggleDrawer(anchor, true)}
            >
                <MenuIcon className={classes.menuIcon}/>
            </IconButton>
            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                classes={{
                    root: classes.root,
                    paper: classes.drawerPaper
                }}
            >
                {list(anchor)}
            </Drawer>
        </div>
    );
}


export default Menu;