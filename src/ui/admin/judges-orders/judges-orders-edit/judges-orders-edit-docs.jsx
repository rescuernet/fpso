import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import JudgesOrdersDocsItem from "./judges-orders-edit-docs-item";
import AdminJudgesOrdersStore from "../../../../bll/admin/admin-judges-orders-store";

const useStyles = makeStyles((theme) => ({
    docs: {
        padding: '20px 0',
    },
    headerWrap: {
        padding: '5px 0',
        marginBottom: 20,
    },
    header: {
        fontSize: '110%',
        fontWeight: "bold"
    },
    docsDeclarationText: {
        fontSize: '90%',
        color: '#00000085',
    },
    docsAdd: {
        display: "flex",
    },
}))

const JudgesOrdersDocs = ({compId}) => {
    const classes = useStyles();

    //загрузка документов
    const UploadDocs = (event) => {
        event.preventDefault();
        const originName = event.target.files[0].name.substr(0,event.target.files[0].name.lastIndexOf("."))
        const data = new FormData()
        data.append('files',event.target.files[0]);
        runInAction( async () => {
            await runInAction(()=>{AdminJudgesOrdersStore.judgesOrdersDocsCreate(data,originName)})
        })
    };

    return (
        <div className={classes.docs}>
            <div className={classes.headerWrap}>
                <div className={classes.header}>Документы</div>
            </div>
            {
                AdminJudgesOrdersStore.judgesOrders.one.docs.map((item,index)=>(
                    <JudgesOrdersDocsItem key={'docs'+index} item={item} index={index} compId={compId}/>
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

export default observer(JudgesOrdersDocs);