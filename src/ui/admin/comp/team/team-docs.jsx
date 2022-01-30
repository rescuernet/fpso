import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import AdminTeamStore from "../../../../bll/admin/admin-team-store";
import AdminTeamDocsItem from "./team-docs-item";

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

const AdminTeamDocs = () => {
    const classes = useStyles();

    //загрузка документов
    const UploadDocs = (event) => {
        event.preventDefault();
        const originName = event.target.files[0].name.substr(0,event.target.files[0].name.lastIndexOf("."))
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction( async () => {
            await runInAction(()=>{AdminTeamStore.teamDocsCreate(data,originName)})
        })
    };

    return (
        <div className={classes.docs}>
            {AdminTeamStore.team.edit && (
                <div>Документы</div>
            )}
            {
                AdminTeamStore.team.docs.map((item,index)=>(
                    <AdminTeamDocsItem key={'docs'+index} item={item} index={index}/>
                ))
            }
            {AdminTeamStore.team.edit && (
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

export default observer(AdminTeamDocs);