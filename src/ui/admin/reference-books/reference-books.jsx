import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import PoolIcon from '@material-ui/icons/Pool';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {NavLink} from "react-router-dom";
import {ADM_RM} from "../../../routes/admin-routes";
import AdminPageWrapper from "../admin-page-wrapper";

const useStyles = makeStyles((theme) => ({
    reference: {
        display: "flex",
    },
    referenceItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: 'center',
        width: 150,
        height: 150,
        border: '1px solid #007eff',
        borderRadius: 5,
        transition: '0.3s',
        margin: 10,
        '& svg': {
            fontSize: 100,
            color: '#007eff',
            transition: '0.3s',
        },
        '&:hover': {
            cursor: 'pointer',
            borderColor: '#ff7600',
            color: '#ff7600',
            '& svg': {
                color: '#ff7600'
            },
        },
    },
    referenceTitle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1,
    }
}))

const ReferenceBooks = (props) => {
    const classes = useStyles();

    return (
        <AdminPageWrapper title={'Справочники'}>
            <div className={classes.reference}>

                <NavLink to={ADM_RM.Reference__Books__Pool.path}>
                    <div className={classes.referenceItem}>
                        <PoolIcon />
                        <div className={classes.referenceTitle}>
                            <span>бассейны</span>
                        </div>
                    </div>
                </NavLink>

                <NavLink to={ADM_RM.Reference__Books__People.path}>
                    <div className={classes.referenceItem}>
                        <PeopleAltIcon />
                        <div className={classes.referenceTitle}>
                            <span>персонажи</span>
                        </div>
                    </div>
                </NavLink>
            </div>
        </AdminPageWrapper>
    );
};

export default observer(ReferenceBooks);