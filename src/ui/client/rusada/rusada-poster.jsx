import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import RUSADA from '../../../common/assets/image/RUSADA.jpg'
import Store from '../../../bll/store'
import {NavLink} from "react-router-dom";
import {UI_RM} from "../../../routes/ui-routes";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        overflow: "hidden",
        marginBottom: 40,
        borderBottom: '1px solid #c4c4c4'
    },
    img: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 20,
        '@media (max-width: 750px)': {
            flexDirection: 'column',
            alignItems: "center",
        },
        '& img': {
            margin: '20px 0'
        }
    },
    slogan: {
        fontFamily: 'Roboto',
        fontWeight: "bold",
        textTransform: 'uppercase',
        fontSize: '200%',
        '@media (max-width: 1280px)': {
            fontSize: '120%'
        },
        '@media (max-width: 750px)': {
            fontSize: '100%'
        },
    },
    content: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
        "& a": {
            border: '1px solid #005580',
            borderRadius: 5,
            padding: '5px 10px',
            '@media (max-width: 750px)': {
                padding: '2px 5px',
                fontSize: '90%'
            },
            color: '#005580!important',
            transition: '0.2s'
        },
        "& a:hover": {
            borderColor: '#ff6200',
            color: '#ff6200!important',
        }
    }
}))

const RusadaPoster = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.img}>
                <img src={RUSADA} alt="" width={Store.width <1280 ? '200' : '400'}/>
                <div className={classes.slogan}>за честный и здоровый спорт!</div>
            </div>
            <div className={classes.content}>
                <NavLink to={UI_RM.Rusada.path}>
                    перейти в раздел антидопинг
                </NavLink>
            </div>
        </div>
    );
};

export default observer(RusadaPoster);