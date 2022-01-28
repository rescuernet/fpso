import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import {runInAction, toJS} from "mobx";
import UiNewsStore from '../../../bll/ui/ui-news-store'
import NewsCardDesktop from "../news/news-card/news-card-desktop";
import Store from "../../../bll/store";
import {NewsCardMobile} from "../news/news-card/news-card-mobile";
import {NavLink} from "react-router-dom";
import {UI_RM} from "../../../routes/ui-routes";
import CompItem from "../comp/comp-item";
import UiCompStore from "../../../bll/ui/ui-comp-store";
import UiPageWrapper from "../ui-page-wrapper";
import BpContainer from "../bp-container";
import Brand from "./brand";
import RusadaPoster from "../rusada/rusada-poster";


const useStyles = makeStyles((theme) => ({
    headerSection: {
        fontFamily: 'Roboto',
        fontSize: '1rem',
        color: '#005580',
        marginBottom: 10,
        display: 'inline-block',
        borderBottom: '1px solid #005580',
        padding: '0 30px 5px 0',
        transition: '0.2s',
        '&:hover': {
            borderColor: '#ff6200',
            color: '#ff6200'
        }
    },
    lastNews: {
        marginBottom: 20
    },
    lastNewsItems: {
        marginTop: 10,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        '@media (max-width: 1280px)': {
            justifyContent: "center",
        },
    },
    lastComp: {
        marginBottom: 40
    },
    lastCompItems: {
        marginTop: 10,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    }
}))

const Main = () => {
    const classes = useStyles();

    const lastNews = toJS(UiNewsStore.news_for_main)
    const lastComp = toJS(UiCompStore.comp_for_main)

    useEffect(()=>{
        runInAction(async ()=>{
            await UiNewsStore.getNewsForMain(2)
            await UiCompStore.getCompForMain(Store.width < 1280 ? 2 : 3)
        })
        return ()=> {
            runInAction(()=>{
                UiNewsStore.news_for_main= []
                UiCompStore.comp_for_main= []
            })
        }
    },[])

    return (
        <UiPageWrapper header={'Главная'}>
            <Brand/>
            <BpContainer>
                <RusadaPoster/>
                {lastNews.length > 0 && (
                    <div className={classes.lastNews}>
                        <NavLink to={UI_RM.News.path}>
                            <div className={classes.headerSection}>Свежие новости</div>
                        </NavLink>
                        <div className={classes.lastNewsItems}>
                            {Store.width <= 750 &&
                                lastNews.map((i,index)=>(
                                    <NewsCardMobile key={index} news={i} />
                                ))
                            }

                            {Store.width > 750 &&
                                lastNews.map((i,index)=>(
                                    <NewsCardDesktop key={index} news={i} />
                                ))
                            }
                        </div>
                    </div>
                )}

                {lastComp.length > 0 && (
                    <div className={classes.lastComp}>
                        <NavLink to={UI_RM.Competitions.path}>
                            <div className={classes.headerSection}>Соревнования</div>
                        </NavLink>
                        <div className={classes.lastCompItems}>
                            {lastComp.map((i,index)=>(
                                <CompItem key={index} comp={i}/>
                            ))}
                        </div>
                    </div>
                )}

            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(Main);