import React from 'react';
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {runInAction} from "mobx";
import AdminCompetitionsStore from "../../../bll/admin/admin-competitions-store";
import {ADM_RM} from "../../../routes/admin-routes";
import CompItem from "./comp-item";
import AdminPageWrapper from "../admin-page-wrapper";


const useStyles = makeStyles((theme) => ({
    control: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: 1000,
        '@media (max-width: 1280px)' : {
            width: 700
        },
        '@media (max-width: 750px)' : {
            width: 340,
            flexDirection: 'column',
            alignItems: 'center'
        },
        marginBottom: 20,
    },
    button: {
        '@media (max-width: 750px)' : {
            width: 250,
            marginBottom: 10
        },
    }
}));

const Comp = (props) => {
    window.scrollTo(0,0)
    const classes = useStyles();
    const history = useHistory();

    const createCompetitions = () => {
        runInAction(async ()=>{
            const response = await AdminCompetitionsStore.compCreate()
            response === 'OK'
                ? history.push(ADM_RM.Competitions__Edit.getUrl(AdminCompetitionsStore.tmpCompId))
                : history.push(ADM_RM.Competitions.path)
        })
    }

    const calendarPlan = () => {
        history.push(ADM_RM.Calendar_Plan.path)
    }


    return (
        <AdminPageWrapper title={'Соревнования'}>
            <div className={classes.control}>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => {createCompetitions()}}
                    className={classes.button}
                >
                    Создать соревнование
                </Button>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => {calendarPlan()}}
                    className={classes.button}
                >
                    Календарный план
                </Button>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    /*onClick={() => {createCompetitions()}}*/
                    className={classes.button}
                >
                    Сборная
                </Button>
            </div>
            <CompItem />
        </AdminPageWrapper>
    );
};

export default observer(Comp);