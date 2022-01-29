import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {TextField} from "@material-ui/core";
import {runInAction, toJS} from "mobx";
import AdminCalendarPlanStore from "../../../../bll/admin/admin-calendar-plan-store";


const useStyles = makeStyles((theme) => ({
    textFields: {
        '& > *': {
            marginBottom: 20
        },
        '& .Mui-disabled': {
            color: '#000000de'
        }
    },
}))

const AdminCalendarPlanFields = () => {
    const classes = useStyles();

    const data = AdminCalendarPlanStore.plan

    return (
        <div className={classes.textFields} >
            <TextField
                id="year"
                label="Год"
                value={data?.year || ''}
                onChange={(e)=>{
                    runInAction(()=>{
                        data.year = e.target.value
                    })
                }}
                variant="outlined"
                fullWidth
                disabled={!data.edit}
            />
            <TextField
                id="text"
                label="Описание"
                value={data?.text || ''}
                onChange={(e)=>{
                    runInAction(()=>{
                        data.text = e.target.value
                    })
                }}
                variant="outlined"
                fullWidth
                multiline
                minRows={3}
                maxRows={10}
                disabled={!data.edit}
            />
        </div>
    );
};

export default observer(AdminCalendarPlanFields);