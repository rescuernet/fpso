import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import s from '../news.module.css'
import * as dateFns from "date-fns";
import {SERVER_URL, STORAGE_URL} from "../../../../const/const";
import {NavLink} from "react-router-dom";
import {UI_RM} from "../../../../routes/ui-routes";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles({
    root: {
        display: "flex",
        width: 600,
        marginBottom: 30,
        backgroundColor: '#fff',
        border: 'solid 1px #c4c4c4',
        borderRadius: 5,
        overflow: 'hidden',
    },
    avatar: {
        flex: '0 0 auto',
        fontSize: 0,
        overflow: "hidden"
    },
    img: {
        width: 200,
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    imgOrig: {
        zIndex: 1000,
        border: '1px solid #fff',
        maxWidth: 200,
        maxHeight: 200,
        boxSizing: "content-box"
    },
    imgBackWrapper: {
        position: 'absolute',
        width: 200,
        height: 200,
        overflow: 'hidden'
    },
    imgBack: {
        filter: 'blur(50px)',
        height: 450
    },
    data: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",

    },
    date: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#005580',
        textAlign: "right",
        padding: '10px 15px 0 0',
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: '1 0',
        margin: '0 15px',
    },
    control: {
        textAlign: "right",
        padding: '0 15px',
    },
    important: {
        borderColor: '#ff0000',
        backgroundColor: '#fff5f5'
    }
});

const NewsCardDesktop = ({news,index}) => {
    const classes = useStyles();

    const avatarIMG = `${STORAGE_URL}/${news.avatar}`

    return (
        <div className={classes.root + ' ' + (news.importantNews ? classes.important : '')}>
            <div className={classes.avatar}>
                {news.avatar
                    ? <div className={classes.img}>
                        <img className={classes.imgOrig} src={avatarIMG} alt=""/>
                        <div className={classes.imgBackWrapper}>
                            <img className={classes.imgBack} src={avatarIMG} alt=""/>
                        </div>
                    </div>
                    : index || index === 0
                        ? <img src={`${SERVER_URL}/crm/news/noava/${index}.jpg`} alt="" width="200" height="200"/>
                        : <img src={`${SERVER_URL}/crm/news/noava/${Math.floor(Math.random() * 10)}.jpg`} alt="" width="200" height="200"/>
                }
            </div>
            <div className={classes.data}>
                <div className={classes.date}>{dateFns.format(new Date(news.dateStart), 'dd.MM.yyyy')}</div>
                <div className={classes.header}>
                    <div className={s.headerText}>
                        {news.headerFirst}
                    </div>
                </div>
                <div className={classes.control}>
                    <NavLink to={UI_RM.News__Id.getUrl(news._id)}>
                        <Button
                            size="small"
                            color="primary"
                        >
                            ??????????????????..
                        </Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default observer(NewsCardDesktop);