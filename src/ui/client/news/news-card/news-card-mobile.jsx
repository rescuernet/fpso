import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import s from '../news.module.css'
import * as dateFns from "date-fns";
import {HTTPS_PROTOCOL, YA_CRM_BUCKET, YA_ENDPOINT, YA_PUBLIC_BUCKET} from "../../../../const/const";
import {Divider} from "@material-ui/core";
import {UI_RM} from "../../../../routes/ui-routes";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 300,
        marginBottom: 30,
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '4px 4px 10px rgba(0,0,0,0.2)',
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        flex: '0 0 auto',
        fontSize: 0,
    },
    img: {
        width: 300,
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    imgOrig: {
        zIndex: 1000,
        border: '1px solid #fff',
        maxWidth: 300,
        maxHeight: 300,
        boxSizing: "content-box"
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
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: '1 0',
        padding: 15,
    },
    control: {
        display: "flex",
        justifyContent: "space-between",
        flex: '0 0 auto',
        padding: '0 10px',
        backgroundColor: '#005580',
        '& button': {
            color: '#fff'
        }
    },
    date: {
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#fff'
    }
});

export const NewsCardMobile = ({news, index})=> {
    const classes = useStyles();

    const avatarIMG = `${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${news.avatar}`

    return (
        <div className={classes.root}>
            <div className={classes.avatar}>
                {news.avatar
                    ? <div className={classes.img}>
                        <img className={classes.imgOrig} src={avatarIMG} alt=""/>
                        <div className={classes.imgBackWrapper}>
                            <img className={classes.imgBack} src={avatarIMG} alt=""/>
                        </div>
                    </div>
                    : index || index === 0
                        ? <img src={`${HTTPS_PROTOCOL}${YA_CRM_BUCKET}.${YA_ENDPOINT}/nonewsavatar/${index}.jpg`} alt="" width="300" height="300"/>
                        : <img src={`${HTTPS_PROTOCOL}${YA_CRM_BUCKET}.${YA_ENDPOINT}/nonewsavatar/${Math.floor(Math.random() * 10)}.jpg`} alt="" width="300" height="300"/>
                }
            </div>
            <div className={classes.header}>
                <div className={s.headerText}>
                    {news.headerFirst}
                </div>
            </div>
            <Divider/>
            <div className={classes.control}>
                <NavLink to={UI_RM.News__Id.getUrl(news._id)}>
                    <Button
                        size="small"
                        color="primary"
                    >
                        Подробнее..
                    </Button>
                </NavLink>
                <div className={classes.date}>{dateFns.format(new Date(news.dateStart), 'dd.MM.yyyy')}</div>
            </div>
        </div>
    );
}
