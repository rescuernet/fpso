import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {FormControlLabel, Switch} from "@material-ui/core";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
    controlCheckBox: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: "wrap",
        padding: 10
    },
}))

const CompCheckbox = () => {
    const classes = useStyles();

    //опубликовать после сохранения
    const ChangePublishAfterSave = (event) => {
        runInAction(()=>{
            AdminCompStore.compOne.published = event.target.checked
        })
    };

    return (
        <div className={classes.controlCheckBox}>
            <FormControlLabel
                control={
                    <Switch
                        checked={AdminCompStore.compOne.published}
                        onChange={ChangePublishAfterSave}
                        name="publishAfterSave"
                        color="secondary"
                    />
                }
                label={!AdminCompStore.compOne.published ? 'опубликовать' : 'снять с публикации'}
            />
        </div>
    );
};

export default observer(CompCheckbox);