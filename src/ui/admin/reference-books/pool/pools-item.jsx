import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {NavLink} from "react-router-dom";
import {ADM_RM} from "../../../../routes/admin-routes";

const useStyles = makeStyles((theme) => ({
    item: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        border: '1px solid #ccc',
        borderRadius: 5,
        padding: 10,
    },
    name: {},
}))

const PoolsItem = ({item,index}) => {
    const classes = useStyles();
    return (
        <div className={classes.item}>
            <div className={classes.name}>
                <div>{item.name}</div>
                <div>{item.address}</div>
            </div>
            <NavLink to={ADM_RM.Reference__Books__Pool_Edit.getUrl(item._id)}>
                <ChevronRightIcon style={{color: '#818181'}}/>
            </NavLink>

        </div>
    );
};

export default observer(PoolsItem);