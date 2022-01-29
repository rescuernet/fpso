import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminPageWrapper from "../../admin-page-wrapper";
import AdminCalendarPlanStore from "../../../../bll/admin/admin-calendar-plan-store";
import {runInAction, toJS} from "mobx";
import AdminCalendarPlanFields from "./calendar-plan-fields";
import AdminAboutUsStore from "../../../../bll/admin/admin-about-us-store";
import {Button} from "@material-ui/core";
import Store from "../../../../bll/store";
import AdminCalendarPlanDocs from "./calendar-plan-docs";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        maxWidth: 600,
    },
    control: {
        display: "flex",
        justifyContent: "space-evenly",
        borderTop: '1px solid #bcbcbc',
        padding: '20px 0',
        marginBottom: 20,
        '@media (max-width: 600px)' : {
            marginTop: 20
        },
    },
}))

const CalendarPlan = (props) => {
    const classes = useStyles();

    useEffect(()=>{
        runInAction(async () => {
            await AdminCalendarPlanStore.calendarPlanGet()
        })
        return () => {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminCalendarPlanStore.clearData()
            })
        }
    },[])

    console.log(toJS(AdminCalendarPlanStore.plan))

    return (
        <AdminPageWrapper title={'Календарный план'}>
            {AdminCalendarPlanStore.plan && (
                <div className={classes.wrapper}>
                    <AdminCalendarPlanFields/>
                    <AdminCalendarPlanDocs/>
                    <div className={classes.control}>
                        {!AdminCalendarPlanStore.plan.edit && (
                            <Button
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=>{
                                    runInAction(()=>{
                                        AdminCalendarPlanStore.plan.edit = true
                                    })
                                }}
                            >
                                Редактировать
                            </Button>
                        )}

                        {AdminCalendarPlanStore.plan.edit && (
                            <>
                                <Button
                                    variant={"outlined"}
                                    color={"primary"}
                                    onClick={()=>{
                                        runInAction( async () => {
                                            await AdminCalendarPlanStore.calendarPlanGet()
                                            await Store.sendMediaDelTmp()
                                        })
                                    }}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color={"primary"}
                                    onClick={()=>{
                                        runInAction( async () => {
                                            await AdminCalendarPlanStore.calendarPlanSave()
                                            await AdminCalendarPlanStore.calendarPlanGet()
                                            await Store.sendMediaDelTmp()
                                        })
                                    }}
                                >
                                    Сохранить
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </AdminPageWrapper>
    );
};

export default observer(CalendarPlan);