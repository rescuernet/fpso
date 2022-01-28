import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {runInAction, toJS} from "mobx";
import {useParams} from "react-router-dom";
import UiNewsStore from "../../../../bll/ui/ui-news-store";
import {HTTPS_PROTOCOL, YA_CRM_BUCKET, YA_ENDPOINT, YA_PUBLIC_BUCKET} from "../../../../const/const";
import {Divider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import s from "./news-view.module.css"
import NewsViewItemDoc from "./news-view-item-doc";
import UiPageWrapper from "../../ui-page-wrapper";
import BpContainer from "../../bp-container";

const useStyles = makeStyles({
    root: {
        minHeight: '100%',
        display: "flex",
        justifyContent: "center"
    },
    news: {
        width: 720,
        '@media (max-width: 750px)': {
            width: 340,
        },
        backgroundColor: '#fff',
        padding: 20
    },
    header: {
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
        '@media (max-width: 750px)': {
            flexDirection: 'column',
            marginBottom: 0
        },
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
    headerFirst: {
        fontSize: '130%',
        fontWeight: 700,
        fontFamily: 'Roboto',
        margin: '0 20px',
        '@media (max-width: 750px)': {
            margin: '20px 0',
        },
    },
    textMain: {
        flex: '1 0',
        padding: '20px 0',
        fontFamily: 'Roboto',
        lineHeight: 1.8,
        fontSize: '120%',
        textAlign: "justify",
        '@media (max-width: 750px)': {
            lineHeight: 1.5,
            textAlign: "left",
        },
    },
    images: {
        margin: '10px 0',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        '& img': {
            maxWidth: 600,
            maxHeight: 600,
            borderRadius: 5,
            margin: '10px 0'
        },
        '@media (max-width: 750px)': {
            '& img': {
                maxWidth: 300,
                maxHeight: 300,
                borderRadius: 5,
                margin: '10px 0'
            },
        },
    },
    docs: {
        padding: '20px 0',
        display: "flex",
        flexDirection: "column",
    },

})



const NewsView = () => {
    const classes = useStyles();
    const news = toJS(UiNewsStore.newsOne)
    const { id } = useParams();

    useEffect(()=>{
        runInAction(()=>{
            UiNewsStore.getNewsId(id)
        })
        return ()=> {
            runInAction(()=>{
                UiNewsStore.newsOne = null
            })
        }
    },[id])


    return (
        <UiPageWrapper header={'Новости'}>
            <BpContainer>
                {news &&
                    <div className={classes.root}>
                        <div className={classes.news}>
                            <div className={classes.header}>
                                <div className={classes.avatar}>
                                    {news.avatar
                                        ? <div className={classes.img}>
                                            <img className={classes.imgOrig} src={`${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${news.avatar}`} alt=""/>
                                            <div className={classes.imgBackWrapper}>
                                                <img className={classes.imgBack} src={`${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${news.avatar}`} alt=""/>
                                            </div>
                                        </div>
                                        : <img src={`${HTTPS_PROTOCOL}${YA_CRM_BUCKET}.${YA_ENDPOINT}/nonewsavatar/${Math.floor(Math.random() * 10)}.jpg`} alt=""/>
                                    }
                                </div>
                                <div>
                                    <div className={`${classes.headerFirst} ${s.headerText}`}>
                                        {news.headerFirst}
                                    </div>
                                </div>
                            </div>

                            <Divider/>

                            <div className={classes.textMain}>{news.textMain}</div>

                            <Divider/>

                            {news.docs.length > 0 &&
                                <div className={classes.docs}>
                                    {news.docs.map((item,index) => (
                                        <NewsViewItemDoc key={'docs' + index} item={item}/>
                                    ))}
                                </div>
                            }

                            <Divider/>

                            {news.images.length > 0 &&
                                <div className={classes.images}>
                                    {news.images.map((item,index) => (
                                        <img key={'images' + index} src={`${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${item}`} alt=""/>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                }
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(NewsView);