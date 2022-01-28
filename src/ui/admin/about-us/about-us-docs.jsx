import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import AdminAboutUsDocsItem from "./about-us-docs-item";
import AdminAboutUsStore from "../../../bll/admin/admin-about-us-store";

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

const AdminAboutUsDocs = ({compId}) => {
    const classes = useStyles();

    //загрузка документов
    const UploadDocs = (event) => {
        event.preventDefault();
        const originName = event.target.files[0].name.substr(0,event.target.files[0].name.lastIndexOf("."))
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction( async () => {
            await runInAction(()=>{AdminAboutUsStore.aboutUsDocsCreate(data,originName)})
        })
    };

    return (
        <div className={classes.docs}>
            {AdminAboutUsStore.aboutUs.edit && (
                <div>Документы</div>
            )}
            {
                AdminAboutUsStore.aboutUs.docs.map((item,index)=>(
                    <AdminAboutUsDocsItem key={'docs'+index} item={item} index={index}/>
                ))
            }
            {AdminAboutUsStore.aboutUs.edit && (
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

export default observer(AdminAboutUsDocs);