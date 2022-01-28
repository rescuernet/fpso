import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {Role} from "../../../../../types/types";
import {Button, Menu, MenuItem} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    wrap: {
        border: '1px solid #ccc',
        marginBottom: 10
    },
    role: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,

    },
    item: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '5px 10px',
        width: 250,
        marginBottom: 10
    },
    title: {
        textTransform: "uppercase"
    },
    delete: {
        fontSize: 0,
        '& svg:hover': {
            cursor: 'pointer'
        }
    },
    description: {
        textTransform: "uppercase",
        fontSize: '90%',
        marginBottom: 15,
        backgroundColor: '#ccc',
        padding: '3px 10px',
    },
    control: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20
    },
    menu: {
        width: 200
    }
}))

const PeopleEditFieldRole = ({role}) => {
    const classes = useStyles();

    const [anchorRole, setAnchorRole] = React.useState(null)
    const roleMenuOpen = (event) => {setAnchorRole(event.currentTarget)}
    const roleMenuClose = () => {setAnchorRole(null)}
    const roleSet = (value) => {
        let res = role.find(item => item === value)
        if(!res){role.push(value)}
        roleMenuClose()
    }
    const roleDelete = (value) => {
        role.splice(value,1)
    }

    return (
        <div className={classes.wrap}>
            <div className={classes.description}>роли</div>
            {role.length > 0 && (
                <div className={classes.role}>
                    {role.map((i,index)=> {
                        let res = Role.find((item => item.value === i))
                        return (
                            <div className={classes.item}>
                                <div className={classes.title}>{res.title}</div>
                                <div className={classes.delete}>
                                    <HighlightOffIcon
                                        color={'secondary'}
                                        onClick={()=>{roleDelete(index)}}
                                    />
                                </div>
                            </div>
                        )
                        })
                    }
                </div>
            )}

            <div className={classes.control}>
                <Button onClick={roleMenuOpen} variant={"outlined"} color={"primary"}>
                    {role.length > 0 ? 'дополнительная роль' : 'выбрать роль'}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorRole}
                    keepMounted
                    open={Boolean(anchorRole)}
                    onClose={roleMenuClose}
                >
                    {Role.map((i)=>(
                        <MenuItem
                            className={classes.menu}
                            onClick={()=> {roleSet(i.value)}}
                        >
                            {i.title}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </div>
    );
};

export default observer(PeopleEditFieldRole);