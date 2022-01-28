import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider} from "@material-ui/core";
import s from './comp.module.css'
import * as dateFns from "date-fns";
import {HTTPS_PROTOCOL, YA_CRM_BUCKET, YA_ENDPOINT, YA_PUBLIC_BUCKET} from "../../../const/const";
import {NavLink} from "react-router-dom";
import {UI_RM} from "../../../routes/ui-routes";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 300,
        height: 510,
        backgroundColor: '#fff',
        boxShadow: '4px 4px 10px rgba(0,0,0,0.2)',
        marginBottom: 40,
        borderRadius: 5,
        overflow: "hidden",
        position: "relative"
    },
    compEndMedal: {
        position: "absolute",
        width: '100%',
        textAlign: "center",
        zIndex: 2000
    },
    avatar: {
        fontSize: 0,
        overflow: "hidden"
    },
    img: {
        width: 300,
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    imgOrig: {
        zIndex: 1000,
        border: '1px solid #fff'
    },
    imgBackWrapper: {
        position: 'absolute',
        width: 300,
        height: 300,
        overflow: 'hidden'
    },
    imgBack: {
        filter: 'blur(50px)',
        height: 450
    },
    date: {
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ff6000',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: '100%',
        color: '#fff',
    },
    location: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: 'Roboto',
        fontSize: '85%',
        padding: '0 20px',
        height: 45
    },
    text: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: '#333',
        fontFamily: 'Robobto',
        fontSize: '110%',
        fontWeight: 'bold',
        flexGrow: 1,
        margin: '0 10px'
    },
    more: {
        textAlign: "right",
        textTransform: "uppercase",
        fontFamily: 'Robobto',
        color: '#005580',
    }
}))

const CompItem = ({comp,index}) => {
    const classes = useStyles();

    const curDate = dateFns.format(new Date(), 'yyyy-MM-dd')
    const compDateEnd = dateFns.format(new Date(comp.dateEnd), 'yyyy-MM-dd')

    const avatarIMG = `${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${comp.avatar}`

    return (
        <Box className={classes.root}>
            {curDate > compDateEnd &&
                <div className={classes.compEndMedal}>
                    <img src={`${HTTPS_PROTOCOL}${YA_CRM_BUCKET}.${YA_ENDPOINT}/medalsCompCard.png`} alt=""/>
                </div>
            }
            <div className={classes.avatar}>
                {
                    comp.avatar
                        ? <div className={classes.img}>
                            <img className={classes.imgOrig} src={avatarIMG} alt=""/>
                            <div className={classes.imgBackWrapper}>
                                <img className={classes.imgBack} src={avatarIMG} alt=""/>
                            </div>
                        </div>
                        : <img src={`${HTTPS_PROTOCOL}${YA_CRM_BUCKET}.${YA_ENDPOINT}/nocompavatar.jpg`} alt=""/>
                }

            </div>
            <div className={classes.date}>
                {comp.dateStart === comp.dateEnd
                ? dateFns.format(new Date(comp.dateStart), 'dd.MM.yyyy')
                : `${dateFns.format(new Date(comp.dateStart), 'dd.MM.yyyy')} - ${dateFns.format(new Date(comp.dateEnd), 'dd.MM.yyyy')}`}
            </div>
            <div className={classes.location}>
                <div>{comp.location.name}</div>
                <div>{comp.location.address}</div>
            </div>
            <Divider/>
            <div className={classes.text}>
                <div className={s.text}>{comp.headerFirst}</div>
            </div>
            <div className={classes.more}>
                <NavLink to={UI_RM.Competitions__Id.getUrl(comp._id)}>
                    <Button
                        size="small"
                        color="primary"
                    >
                        Подробнее..
                    </Button>
                </NavLink>
            </div>
        </Box>
    );
};

export default CompItem;