import React from 'react';
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import NewsItem from "./news-item";
import {runInAction} from "mobx";
import AdminNewsStore from "../../../bll/admin/admin-news-store";
import {ADM_RM} from "../../../routes/admin-routes";
import AdminPageWrapper from "../admin-page-wrapper";


const useStyles = makeStyles((theme) => ({
    control: {
        marginBottom: 20,
    },
}));


const News = (props) => {
    window.scrollTo(0,0)
    const classes = useStyles();
    const history = useHistory();

    const createNews = () => {
        runInAction(async ()=>{
            const response = await AdminNewsStore.newsCreate()
            response === 'OK'
                ? history.push(ADM_RM.News__Edit.getUrl(AdminNewsStore.tmpNewsId))
                : history.push(ADM_RM.Main.path)
        })
    }


    return (
        <AdminPageWrapper title={'Новости'}>
            <div className={classes.control}>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => {createNews()}}
                >
                    Создать новость
                </Button>
            </div>

            <NewsItem />

        </AdminPageWrapper>
    );
};

export default observer(News);