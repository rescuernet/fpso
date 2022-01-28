import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider} from "@material-ui/core";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import {NewsAlertDialog} from "./news-alert";
import {useHistory, useParams} from "react-router-dom";
import Store from "../../../../bll/store";
import NewsAvatar from "./news-avatar";
import NewsImages from "./news-images";
import NewsFields from "./news-fields";
import NewsCheckbox from "./news-checkbox";
import NewsDocs from "./news-docs";
import {ADM_RM} from "../../../../routes/admin-routes";
import AdminPageWrapper from "../../admin-page-wrapper";


const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: 600,
        '@media (max-width: 750px)' : {
            width: 340,
        },
        '@media (max-width: 1280px)' : {
            margin: '0 auto'
        },
    },
    control: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
        '@media (max-width: 750px)' : {
            marginTop: 20,
        },
    },
    controlCheckBox: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: "wrap",
        padding: 10
    },
    controlButton: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: 20,
        '@media (max-width: 750px)' : {
            flexDirection: 'column',
            alignItems: "center",
        },
    },
    Button: {
        width: 120,
        '@media (max-width: 750px)' : {
            marginBottom: 20,
        },
    }
}));

const NewsCreateEdit = () => {
    const history = useHistory();
    const { id } = useParams();


    useEffect(()=>{
        runInAction(async () => {
            await Store.sendMediaDelTmp()
            await AdminNewsStore.getNewsId(id)
        })
        return ()=> {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminNewsStore.clearData()})
        }
    },[id])


    const classes = useStyles();

    const [deleteNews, setDeleteNews] = useState(false);

    //отмена
    const Cancel = () => {
        history.push(ADM_RM.News.path)
    };


    //создание массива для обновления
    const UpdateArr = async () => {
        const result = await AdminNewsStore.newsUpdate()
        if(result === 200){
            history.push(ADM_RM.News.path)
        }
    };

    const newsDelete = () => {
        setDeleteNews(true)
    }

    const newsDeleteConfirm = async (id) => {
        setDeleteNews(false)
        const result = await AdminNewsStore.newsDelete(id)
        if(result === 200){
            history.push(ADM_RM.News.path)
        }
    }

    return (
        <AdminPageWrapper title={'Новости'}>
            {AdminNewsStore.newsOne &&
                <div className={classes.wrapper}>
                    <NewsAvatar newsId={id}/>

                    <Divider/>

                    <NewsFields/>

                    <Divider/>

                    <NewsImages newsId={id}/>

                    <Divider/>

                    <NewsDocs newsId={id}/>

                    <Divider/>

                    <div className={classes.control}>

                        <NewsCheckbox />

                        <Divider/>
                        <div className={classes.controlButton}>
                            <Button
                                className={classes.Button}
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=>{Cancel()}}
                            >
                                Отмена
                            </Button>
                            <Button
                                className={classes.Button}
                                variant="contained"
                                color={"primary"}
                                onClick={()=>{UpdateArr()}}
                            >
                                Сохранить
                            </Button>
                            {!AdminNewsStore.newsOne.tmpNews &&
                                <Button
                                    className={classes.Button}
                                    variant="contained"
                                    color={"secondary"}
                                    onClick={()=>{newsDelete()}}
                                >
                                    удалить
                                </Button>
                            }
                            {deleteNews &&
                                <NewsAlertDialog
                                    alertType={'confirm'}
                                    open={true}
                                    header={'Внимание!'}
                                    text={'Подтвердите удаление новости'}
                                    delete={()=>{newsDeleteConfirm(id)}}
                                    close={()=>{setDeleteNews(false)}}
                                />
                            }

                        </div>
                    </div>
                    {AdminNewsStore.news_tmp_errors &&
                        <NewsAlertDialog
                            open={true}
                            header={'Ошибка!'}
                            text={AdminNewsStore.news_tmp_errors}
                        />
                    }
                </div>
            }
        </AdminPageWrapper>
    );
};

export default observer(NewsCreateEdit);