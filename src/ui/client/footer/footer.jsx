import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import BpContainer from "../bp-container";

const useStyles = makeStyles((theme) => ({
    footer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderTop: '1px solid #ff6200',
        backgroundColor: '#e6e6e6',
        padding: '10px 0',
    },
    divider: {
        borderTop: '1px solid #ccc',
        width: '100%',
        margin: '7px 0'
    },
    content: {
        display: "flex",
        justifyContent: "space-around",
        color: '#005580',
        '@media (max-width: 750px)': {
            flexDirection: 'column',
        },
    },
    title: {
        display: "flex",
        alignItems: "center",
        textTransform: "uppercase",
        '@media (max-width: 750px)': {
            fontSize: '90%',
            marginBottom: 20
        },
    },
    contact: {
        '& div': {
            marginBottom: 5
        },
        '@media (max-width: 750px)': {
            fontSize: '90%',
        },
    },
    prod: {
        display: "flex",
        alignItems: "center",
        color: '#005580'
    },
    prodSign: {
        fontSize: '130%',
        marginRight: 10,
        '@media (max-width: 750px)': {
            fontSize: '100%',
        },
    },
    prodText: {
        '@media (max-width: 750px)': {
            fontSize: '90%',
        },
    }
}))

const Footer = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <BpContainer>
                <div className={classes.content}>
                    <div className={classes.title}>Федерация плавания Самарской области</div>
                    <div className={classes.contact}>
                        <div>443071 г. Самара, Волжский проспект, 10</div>
                        <div>8 (846) 375-92-45</div>
                        <div>swimclub@mail.ru</div>
                    </div>
                </div>
            </BpContainer>
            <div className={classes.divider}/>
            <div className={classes.prod}>
                <div className={classes.prodSign}>&#169;</div>
                <div className={classes.prodText}>GSV team, 2021-2022</div>
            </div>
        </div>
    );
};

export default observer(Footer);