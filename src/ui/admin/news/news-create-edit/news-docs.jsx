import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import NewsDocsItem from "./news-docs-item";

const useStyles = makeStyles((theme) => ({
    docs: {
        padding: '20px 0'
    },
    docsAdd: {
        display: "flex",
        justifyContent: "center",
    },
}))

const NewsDocs = ({newsId}) => {
    const classes = useStyles();

    //загрузка документов
    const UploadDocs = (event) => {
        event.preventDefault();
        const originName = event.target.files[0].name.substr(0,event.target.files[0].name.lastIndexOf("."))
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction( async () => {
            await runInAction(()=>{AdminNewsStore.newsDocsCreate(data,originName)})
        })
    };
    //удаление одного документа
    const DeleteOneDocs = (docsId,docsName) => {
        runInAction(() => {
            AdminNewsStore.mediaDel.push(docsName)
            AdminNewsStore.newsOne.docs.splice(docsId,1)
        })
    };

    return (
        <div className={classes.docs}>
            {
                AdminNewsStore.newsOne.docs && AdminNewsStore.newsOne.docs.map((item,index)=>(
                    <NewsDocsItem key={'docs'+index} item={item} index={index} newsId={newsId} DeleteOneDocs={DeleteOneDocs}/>
                ))
            }
            <div className={classes.docsAdd}>
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
        </div>
    );
};

export default observer(NewsDocs);