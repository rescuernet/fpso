import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import AdminCalendarPlanStore from "../../../bll/admin/admin-calendar-plan-store";
import AdminCalendarPlanDocsItem from "./calendar-plan-docs-item";

const useStyles = makeStyles((theme) => ({
    docs: {
        '& > *': {
            marginBottom: 20
        }
    },
    add: {
        display: "flex",
        justifyContent: "center",
    },
}))

const AdminCalendarPlanDocs = () => {
    const classes = useStyles();

    //загрузка документов
    const UploadDocs = (event) => {
        event.preventDefault();
        const originName = event.target.files[0].name.substring(0,event.target.files[0].name.lastIndexOf("."))
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction( async () => {
            await runInAction(()=>{AdminCalendarPlanStore.calendarPlanDocsCreate(data,originName)})
            event.target.value = ''
        })
    };

    const docsCount = AdminCalendarPlanStore.plan?.docs && AdminCalendarPlanStore.plan.docs.length


    return (
        <div className={classes.docs}>
            {AdminCalendarPlanStore.plan.edit && (
                <div>Документы</div>
            )}
            {
                AdminCalendarPlanStore.plan.docs.map((item,index)=>(
                    <AdminCalendarPlanDocsItem key={'docs'+index} item={item} index={index} docsCount={docsCount}/>
                ))
            }
            {AdminCalendarPlanStore.plan.edit && (
                <div className={classes.add}>
                    <label htmlFor="docs">
                        <input
                            style={{ display: 'none' }}
                            id="docs"
                            name="docs"
                            type="file"
                            onChange={UploadDocs}
                        />
                        <Button
                            color="primary"
                            size="small"
                            variant={"outlined"}
                            component={'span'}
                        >
                            добавить документ
                        </Button>
                    </label>
                </div>
            )}
        </div>
    );
};

export default observer(AdminCalendarPlanDocs);