import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import Store from "../../bll/store";
import AdminMenu from "./menu/admin-menu";
import AdminHeader from "./header/admin-header";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: "relative"
    },
    wrapper: {
        flexGrow: 1,
        margin: '10px 30px',
        '@media (max-width: 1280px)': {
            margin: '70px 10px 10px 10px',
        }
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 20,
        borderBottom: '1px solid #ccc',
        marginBottom: 20
    },
}))

const AdminPageWrapper = ({title, children}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {Store.width > 1280 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={title}/>}
            <div className={classes.wrapper}>
                {Store.width > 1280 && <div className={classes.header}><Typography variant={'h5'}>{title}</Typography></div>}
                {children}
            </div>
        </div>
    );
};

export default observer(AdminPageWrapper);