import React from 'react';
import {AppBar} from "@material-ui/core";
import AdminMenu from "../menu/admin-menu";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    appBar: {
        display:'flex',
        flexDirection:'row',
        alignItems: "center",
        position: "fixed",
    }
}))

const AdminHeader = (props) => {
    const classes = useStyles()



    return (
        <AppBar className={classes.appBar}>
            <AdminMenu open={false} menuIconView={true}/>
            <div>{props.header}</div>
        </AppBar>
    );
};

export default AdminHeader;