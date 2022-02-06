import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import UiPageWrapper from "../ui-page-wrapper";
import BpContainer from "../bp-container";
import Antidoping from '../../../common/assets/image/antidoping.png'
import Rusada_small from '../../../common/assets/image/RUSADA_small.jpg'
import {runInAction} from "mobx";
import UiRusadaStore from "../../../bll/ui/ui-rusada-store";
import RusadaItemDocs from "./rusada-item-docs";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(() => ({
    wrapper: {
    },
    header: {
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        borderBottom: '1px solid #ccc',
        '@media (max-width: 1280px)': {
            alignItems: 'center',
            '& img': {
                width: 200,
                height: 'auto',
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
    },
    rusada: {
        maxWidth: 600,
        padding: "0 10px",
        margin: '0 auto',
        marginBottom: 40
    },
    rusadaSite: {
        maxWidth: 600,
        margin: '0 auto',
        display: "flex",
        alignItems: 'center',
        justifyContent: "space-evenly",
        border: '1px solid #005580',
        padding: 10,
        borderRadius: 10,
        '@media (max-width: 750px)': {
            flexDirection: 'column',
            alignItems: 'center',
            '& img': {
                margin: '0 0 20px 0'
            }
        },
        '& > div': {
            color: '#005580',
            fontSize: '150%'
        },
        marginBottom: 40,
        '&:hover > div': {
            color: '#ff6500'
        }
    },
    docs: {
        margin: '0 auto',
    },
}))

const Rusada = (props) => {
    const classes = useStyles();

    useEffect(()=>{
        runInAction(async ()=>{
            await UiRusadaStore.rusadaGet()
        })
    },[])

    const rusada = UiRusadaStore.rusada

    return (
        <UiPageWrapper header={'Антидопинг'}>
            <BpContainer>
                <div className={classes.wrapper}>
                    <div className={classes.header}>
                        <img src={Antidoping} alt=""/>
                        <div className={classes.slogan}>
                            <div><span>ДОПИНГ — </span></div>
                            <div>СОВЕРШЕНИЕ ОДНОГО ИЛИ</div>
                            <div>НЕСКОЛЬКИХ НАРУШЕНИЙ</div>
                            <div>АНТИДОПИНГОВЫХ ПРАВИЛ!</div>
                        </div>
                    </div>

                    <NavLink to={{pathname:"https://rusada.ru/"}} target="_blank">
                        <div className={classes.rusadaSite}>
                            <img src={Rusada_small} alt="" width={150}/>
                            <div>Перейти на сайт РУСАDA</div>
                        </div>
                    </NavLink>

                    <div className={classes.rusada}>

                        {UiRusadaStore.rusada && (
                            <div className={classes.docs}>
                                {rusada.docs.map((item,index)=>(
                                    <RusadaItemDocs key={index} docs={item}/>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(Rusada);