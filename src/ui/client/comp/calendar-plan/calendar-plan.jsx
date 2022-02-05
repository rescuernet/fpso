import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import UiPageWrapper from "../../ui-page-wrapper";
import BpContainer from "../../bp-container";
import Rusada from "../../rusada/rusada-poster";
import {runInAction, toJS} from "mobx";
import UiCalendarPlanStore from "../../../../bll/ui/ui-calendar-plan-store";
import CalendarPlanItemDocs from "./calendar-plan-item-docs";

const useStyles = makeStyles((theme) => ({
    plan: {
        display: "flex",
        justifyContent: "center"
    },
    wrapper: {
        width: 600,
        '@media (max-width: 750px)': {
            maxWidth: 360,
            padding: "0 10px"
        },
    },
    header: {
        fontSize: '150%',
        textAlign: "center",
        marginBottom: 40,
        '@media (max-width: 750px)': {
            fontSize: '130%',
        },
    },
    text: {
        marginBottom: 40
    }
}))

const CalendarPlan = (props) => {
    const classes = useStyles();

    useEffect(()=>{
        runInAction(async ()=>{
            await UiCalendarPlanStore.calendarPlanGet()
        })
    },[])

    const plan = UiCalendarPlanStore.plan

    return (
        <UiPageWrapper header={'Календарный план'}>
            <BpContainer>
                <Rusada/>
                {plan && (
                    <div className={classes.plan}>
                        <div className={classes.wrapper}>
                            <div className={classes.header}>{`Календарный план на ${plan.year} год`}</div>
                            {plan.text && (
                                <div className={classes.text}>{plan.text}</div>
                            )}
                            {plan.docs.map((i,index)=>(
                                <CalendarPlanItemDocs key={index} docs={i}/>
                            ))}
                        </div>
                    </div>
                )}
            </BpContainer>
        </UiPageWrapper>
    );
};

export default observer(CalendarPlan);