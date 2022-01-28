import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import UiPageWrapper from "../ui-page-wrapper";
import BpContainer from "../bp-container";
import Antidoping from '../../../common/assets/image/antidoping.png'

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100%',
        backgroundColor: '#fff',
        overflow: "hidden"
    },
    header: {
        display: "flex",
        marginTop: 20,
        justifyContent: "space-evenly",
        borderBottom: '1px solid #ccc',
        '@media (max-width: 1280px)': {
            alignItems: 'center',
            '& img': {
                width: 200,
                height: 'auto',
                '@media (max-width: 750px)': {
                    flexDirection: 'column',
                    marginBottom: 10,
                },
            }
        },
        '@media (max-width: 750px)': {
            flexDirection: 'column',
            marginTop: 10,
        },
    },
    slogan: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: 'Roboto',
        fontSize: '200%',
        '& span': {
            color: '#ff0000',
            fontWeight: 'bold'
        },
        '@media (max-width: 1280px)': {
            fontSize: '150%',
        },
        '@media (max-width: 750px)': {
            fontSize: '120%',
            marginBottom: 15
        },
    }
}))

const Rusada = (props) => {
    const classes = useStyles();

    return (
        <UiPageWrapper header={'Антидопинг'}>
            <BpContainer>
                <div className={classes.root}>
                    <div className={classes.header}>
                        <img src={Antidoping} alt=""/>
                        <div className={classes.slogan}>
                            <div><span>ДОПИНГ — </span></div>
                            <div>СОВЕРШЕНИЕ ОДНОГО ИЛИ</div>
                            <div>НЕСКОЛЬКИХ НАРУШЕНИЙ</div>
                            <div>АНТИДОПИНГОВЫХ ПРАВИЛ!</div>
                        </div>
                    </div>
                </div>
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(Rusada);