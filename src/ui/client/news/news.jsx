import React, {useEffect} from 'react';
import {runInAction, toJS} from "mobx";
import UiNewsStore from '../../../bll/ui/ui-news-store'
import {observer} from "mobx-react-lite";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Store from "../../../bll/store";
import {Pagination} from "@material-ui/lab";
import {NewsCardMobile} from "./news-card/news-card-mobile";
import NewsCardDesktop from "./news-card/news-card-desktop";
import {useHistory, useParams} from "react-router-dom";
import {UI_RM} from "../../../routes/ui-routes";
import UiPageWrapper from "../ui-page-wrapper";
import BpContainer from "../bp-container";
import Rusada from "../rusada/rusada-poster";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 50,
    },
    newsListItem: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        '@media (max-width: 1280px)': {
            justifyContent: "space-evenly",
        },
        marginTop: 20
    },
    paginationTop: {
        display: "flex",
        justifyContent: "center",
        margin: '40px 0',
        '@media (max-width: 750px)': {
            margin: '20px 0',
        },
    },
    paginationBottom: {
        display: "flex",
        justifyContent: "center",
        margin: '20px 0 40px 0'
    }
}))

const News = () => {

    const history = useHistory()
    const {page} = useParams()

    const pagesCount = toJS(UiNewsStore.news.pages)
    const pageCur = toJS(UiNewsStore.news.page)
    const newsItem = toJS(UiNewsStore.news.docs)

    const classes = useStyles();

    useEffect(()=>{
        runInAction(()=>{UiNewsStore.getNews(page)})
        return ()=> {runInAction(()=>{UiNewsStore.news = []})}
    },[page])

    const ChangePage = (e, toPage) => {
        window.scrollTo(0,0)
        history.push(UI_RM.News__Page.getUrl(toPage))
    };

    return (
        <UiPageWrapper header={'Новости'}>
            <BpContainer>
                <Rusada/>
                {newsItem &&
                    <>
                        {pagesCount > 1 &&
                            <div className={classes.paginationTop}>
                                <Pagination
                                    count={pagesCount}
                                    page={pageCur}
                                    color={"primary"}
                                    size={Store.width < 750 ? 'small' : 'medium'}
                                    onChange={ChangePage}
                                />
                            </div>
                        }
                        <Box className={classes.newsListItem}>
                            {Store.width < 750 &&
                                newsItem.map((i,index)=>(
                                    <NewsCardMobile key={index} news={i} index={index} />
                                ))
                            }

                            {Store.width >= 750 &&
                                newsItem.map((i,index)=>(
                                    <NewsCardDesktop key={index} news={i} index={index} />
                                ))
                            }
                        </Box>
                        {pagesCount > 1 &&
                            <div className={classes.paginationBottom}>
                                <Pagination
                                    count={pagesCount}
                                    page={pageCur}
                                    color={"primary"}
                                    size={Store.width < 750 ? 'small' : 'medium'}
                                    onChange={ChangePage}
                                />
                            </div>
                        }
                    </>
                }
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(News);